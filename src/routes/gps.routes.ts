import * as express from "express";
import { Router } from "express";
import { Validator, ValidatorResult } from "jsonschema"
import { GPS_SET } from "../schema";
import * as moment from "moment";
import { terminal as term } from "terminal-kit";
import { GPS } from "../model/gps";

export const router: Router = express.Router();

router.post("/", (request, response) => {
    const gps: GPS[] = request.body;
    term.green(gps.length + '\n');

    response.status(200).json({ success: "true" });
});
