"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.router = express.Router();
exports.router.post("/", function (request, response) {
    var gps = request.body;
    console.log(gps.length);
    response.status(200).json({ success: "true" });
});
