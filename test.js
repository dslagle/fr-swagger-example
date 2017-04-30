const Redis = require("./test/mock/redis").Redis;
const redis = new Redis();

const multi = redis.multi();

multi.hmset("test", { some: "value" });
multi.exec((err) => {
    redis.hgetall("test", (err, obj) => {
        console.log(err);
        console.log(obj);
    });
});