"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
function GPSRouter(redis) {
    var router = express.Router();
    router.post("/", function (request, response) {
        var gps = request.body;
        var batch = redis.multi();
        for (var _i = 0, gps_1 = gps; _i < gps_1.length; _i++) {
            var g = gps_1[_i];
            batch.hmset("" + g.DeviceID + g.ActualDateTime, g);
        }
        batch.exec(function (err) {
            if (err) {
                response.status(500).json({ error: err });
            }
            else {
                response.status(200).json({ success: "true" });
            }
        });
    });
    router.get("/:key", function (request, response) {
        redis.hgetall(request.params.key, function (err, obj) {
            if (err) {
                response.status(500).json({ error: err });
            }
            else {
                response.json(obj);
            }
        });
    });
    router.get("/", function (request, response) {
        response.json({ DeviceID: 10, ActualDateTime: "", ReceivedDateTime: "", Heading: 10, Speed: 55, Latitude: 33.567, Longitude: -128.456 });
    });
    return router;
}
exports.GPSRouter = GPSRouter;
