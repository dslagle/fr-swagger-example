"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var gps_controller_1 = require("../controllers/gps.controller");
function GPSRouter(redis) {
    var router = express.Router();
    var controller = new gps_controller_1.GPSController(redis);
    router.post("/", controller.PostGPSHandler);
    router.get("/:key", controller.GetGPSByKeyHandler);
    router.get("/", controller.GetGPSHandler);
    return router;
}
exports.GPSRouter = GPSRouter;
