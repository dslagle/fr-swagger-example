import * as express from "express";
import * as http from "http";

import { Application } from "express";
import { urlencoded, json } from "body-parser";
import { Routes } from "./routes";
import { SchemaMiddleware, SCHEMAS } from "./schema";

const PORT = 8080;
const IP = "0.0.0.0";

const app: Application = express();
const server = http.createServer(app);

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/trip", SchemaMiddleware(SCHEMAS.TRIP_SET), Routes.TripRouter);
app.use("/gps", SchemaMiddleware(SCHEMAS.GPS_SET), Routes.GPSRouter);

server.listen(PORT, IP);