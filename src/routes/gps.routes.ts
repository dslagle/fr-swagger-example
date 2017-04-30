import * as express from "express";
import { Router } from "express";
import { Validator, ValidatorResult } from "jsonschema"
import { GPS_SET } from "../schema";
import * as moment from "moment";
import { GPS } from "../model/gps";
import { Redis } from "ioredis";

export function GPSRouter(redis: Redis): Router {
    const router: Router = express.Router();

    router.post("/", (request, response) => {
        const gps: GPS[] = request.body;
        const batch = redis.multi();
        for (const g of gps) {
            batch.hmset(`${g.DeviceID}${g.ActualDateTime}`, g);
        }
        batch.exec((err) => {
            if (err) {
                response.status(500).json({ error: err });
            }
            else {
                response.status(200).json({ success: "true" });
            }
        })
    });

    router.get("/:key", (request, response) => {
        redis.hgetall(request.params.key, (err, obj) => {
            if (err) {
                response.status(500).json({ error: err });
            }
            else {
                response.json(obj);
            }
        });
    });

    router.get("/", (request, response) => {
        response.json({ DeviceID: 10, ActualDateTime: "", ReceivedDateTime: "", Heading: 10, Speed: 55, Latitude: 33.567, Longitude: -128.456 });
    });

    return router;
}