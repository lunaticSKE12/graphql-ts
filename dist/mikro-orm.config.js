"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
exports.default = {
    entities: [Post_1.Post],
    dbName: 'lireddit',
    type: 'postgresql',
    user: 'lunatic',
    password: '1q2w3e4r',
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map