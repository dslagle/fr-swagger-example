function RedisMulti(store) {
    this.store = store;
}

RedisMulti.prototype.hmset = function(key, value) {
    this.store[key] = value;
}

RedisMulti.prototype.exec = function(cb) {
    cb();
}

function Redis() {
    this.store = {};
}

Redis.prototype.multi = function() {
    return new RedisMulti(this.store);
}

Redis.prototype.hgetall = function(key, cb) {
    if (this.store[key]) {
        cb(null, this.store[key]);
    } else {
        cb(new Error(`Key not found: ${key}`), null);
    }
}

module.exports = Redis;