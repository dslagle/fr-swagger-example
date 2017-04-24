"use strict";
var express = require("express");
exports.router = express.Router();
exports.router.get("/:id", function (request, response) {
    response.json({ name: "test", id: request.params.id });
});
exports.router.post("/", function (request, response) {
    response.json({ success: true, trip: request.body });
});
