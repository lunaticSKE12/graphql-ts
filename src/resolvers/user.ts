import { ObjectType } from 'type-graphql';
import { User } from './../entities/User';
import { MyContext } from 'src/types';
import {Resolver, Mutation, Arg, InputType, Field, Ctx} from 'type-graphql'
import "reflect-metadata";
import argon2 from 'argon2'

@InputType()
class UsernamePasswordInput{
  @Field()
  username:string
  @Field()
  password:string
}

@ObjectType()
class FieldError{
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse{
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]

  @Field(() => User, {nullable: true})
  user?:User

}

@Resolver()
export class UserResolver{
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options:UsernamePasswordInput,
    @Ctx() {em}: MyContext
  ) :Promise<UserResponse>{

    if(options.username.length <= 2){
      return{
        errors: [{
          field:'username',
          message: 'username length must be greater than 2'
        }]
      }
    }

    if(options.password.length <= 2){
      return{
        errors: [{
          field:'password',
          message: 'password length must be greater than 2'
        }]
      }
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User,{username: options.username, password: hashedPassword});
    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if(error.detail.includes("already exists")){
        return{
          errors: [{
            field:"username",
            message: "username already exists"
          }]
        }
      }
    }
    return {user}
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options:UsernamePasswordInput,
    @Ctx() {em}: MyContext
  ): Promise<UserResponse>  {
    const user = await em.findOne(User,{username: options.username});
    if(!user){
      return{ 
        errors:[{
            field: "username",
            message: "That username doesn't exist"
          }]
      }
    }
    const valid = await argon2.verify(user.password, options.password)
    if(!valid){
      return{ 
        errors:[{
            field: "password",
            message: "incorrect password"
          }]
      }
    }


    return {user}
  }
}