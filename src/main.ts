import * as Redis from "ioredis";

import { Redis as RedisClient, RedisOptions } from "ioredis";
import { App } from "./app";

const redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    family: 4
};

const redis: RedisClient = new Redis(redisOptions);

new App(redis).run();