import * as express from "express";
import { Router } from "express";
import { Validator, ValidatorResult } from "jsonschema"
import { GPS_SET } from "../schema";
import * as moment from "moment";
import { GPS } from "../model/gps";

export const router: Router = express.Router();

router.post("/", (request, response) => {
    const gps: GPS[] = request.body;
    console.log(gps.length);

    response.status(200).json({ success: "true" });
});

router.get("/", (request, response) => {
    response.json({ DeviceID: 10, ActualDateTime: "", ReceivedDateTime: "", Heading: 10, Speed: 55, Latitude: 33.567, Longitude: -128.456 });
});
