import * as express from "express";
import * as http from "http";

import { Application } from "express";
import { urlencoded, json } from "body-parser";
import { Routes } from "./routes";
import { SchemaMiddleware, SCHEMAS } from "./schema";
import { Redis } from "ioredis";

const PORT = process.env.LISTEN_PORT || 8080;
const IP = process.env.LISTEN_ADDR || "0.0.0.0";

export class App {
    constructor(private redis: Redis) { }

    server: http.Server;

    run(): void {
        const app: Application = express();
        
        this.server = http.createServer(app);

        app.use(urlencoded({ extended: true }));
        app.use(json());

        app.use("/trip", SchemaMiddleware(SCHEMAS.TRIP_SET), Routes.TripRouter(this.redis));
        app.use("/gps", SchemaMiddleware(SCHEMAS.GPS_SET), Routes.GPSRouter(this.redis));

        this.server.listen(PORT, IP);
    };
}