function Redis() {
    this.store = {};
}

Redis.prototype.multi = function() {
    return this;
}

Redis.prototype.exec = function(cb) {
    cb();
}

Redis.prototype.hgetall = function(key, cb) {
    if (this.store[key]) {
        cb(null, this.store[key]);
    } else {
        cb(new Error(`Key not found: ${key}`), null);
    }
}

Redis.prototype.hmset = function(key, value) {
    this.store[key] = value;
}

module.exports = Redis;