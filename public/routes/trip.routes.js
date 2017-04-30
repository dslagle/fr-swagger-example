"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
function TripRouter(redis) {
    var router = express.Router();
    router.get("/:id", function (request, response) {
        response.json({ name: "test", id: request.params.id });
    });
    router.post("/", function (request, response) {
        response.json({ success: true, trip: request.body });
    });
    return router;
}
exports.TripRouter = TripRouter;
