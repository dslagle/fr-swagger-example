import * as express from "express";
import { Router } from "express";
import { GPS } from "../model/gps";
import { Redis } from "ioredis";
import { GPSController } from "../controllers/gps.controller";

export function GPSRouter(redis: Redis): Router {
    const router: Router = express.Router();
    const controller: GPSController = new GPSController(redis);

    router.post("/", controller.PostGPSHandler);
    router.get("/:key", controller.GetGPSByKeyHandler);
    router.get("/", controller.GetGPSHandler);

    return router;
}