"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.router = express.Router();
exports.router.post("/", function (request, response) {
    var gps = request.body;
    console.log(gps.length);
    response.status(200).json({ success: "true" });
});
exports.router.get("/", function (request, response) {
    response.json({ DeviceID: 10, ActualDateTime: "", ReceivedDateTime: "", Heading: 10, Speed: 55, Latitude: 33.567, Longitude: -128.456 });
});
