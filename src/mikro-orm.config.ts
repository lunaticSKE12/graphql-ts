import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from 'path';
import { User } from './entities/User';

export default {
  migrations:{
    path: path.join(__dirname,'./migrations'), // path to the fol  der with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    
  },
  entities: [Post, User],
  dbName: 'lireddit',
  type: 'postgresql',
  user: 'lunatic',
  password: '1q2w3e4r',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];