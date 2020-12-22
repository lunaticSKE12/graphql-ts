import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

export default {
  entities: [Post],
  dbName: 'lireddit',
  type: 'postgresql',
  user: 'lunatic',
  password: '1q2w3e4r',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];