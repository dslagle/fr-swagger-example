"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Redis = require("ioredis");
var app_1 = require("./app");
var redisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    family: 4
};
var redis = new Redis(redisOptions);
new app_1.App(redis).run();
