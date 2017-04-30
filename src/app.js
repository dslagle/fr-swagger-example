"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var body_parser_1 = require("body-parser");
var routes_1 = require("./routes");
var schema_1 = require("./schema");
var PORT = process.env.LISTEN_PORT || 8080;
var IP = process.env.LISTEN_ADDR || "0.0.0.0";
var App = (function () {
    function App(redis) {
        this.redis = redis;
    }
    App.prototype.run = function () {
        var app = express();
        this.server = http.createServer(app);
        app.use(body_parser_1.urlencoded({ extended: true }));
        app.use(body_parser_1.json());
        app.use("/trip", schema_1.SchemaMiddleware(schema_1.SCHEMAS.TRIP_SET), routes_1.Routes.TripRouter(this.redis));
        app.use("/gps", schema_1.SchemaMiddleware(schema_1.SCHEMAS.GPS_SET), routes_1.Routes.GPSRouter(this.redis));
        this.server.listen(PORT, IP);
    };
    ;
    return App;
}());
exports.App = App;
