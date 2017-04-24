"use strict";
var express = require("express");
var terminal_kit_1 = require("terminal-kit");
exports.router = express.Router();
exports.router.post("/", function (request, response) {
    var gps = request.body;
    terminal_kit_1.terminal.green(gps.length + '\n');
    response.status(200).json({ success: "true" });
});
