import { Request, Response } from "express";
import { GPS_SCHEMA } from "./gps/gps.schema";
import { TRIP_SCHEMA } from "./trip/trip.schema";

import * as Ajv from "ajv";
export * from "./gps/gps.schema";
export * from "./trip/trip.schema"

export interface SCHEMA {
    key: string,
    schema: any
};

export const SCHEMAS = {
    "GPS": { key: "gps.schema.json", schema: GPS_SCHEMA.GPS },
    "GPS_SET": { key: "gps-set.schema.json", schema: GPS_SCHEMA.GPS_SET },
    "TRIP": { key: "trip.schema.json", schema: TRIP_SCHEMA.TRIP },
    "TRIP_SET": { key: "trip-set.schema.json", schema: TRIP_SCHEMA.TRIP_SET }
};

export const ajv = new Ajv();

for (const s in SCHEMAS) {
    ajv.addSchema(SCHEMAS[s].schema, SCHEMAS[s].key);
};

export const SchemaMiddleware = (schema: SCHEMA, methods: string[] = [ "POST" ]) => {
    return (request: Request, response: Response, next) => {
        if (methods.indexOf(request.method) < 0) {
            next();
            return;
        }

        const result = ajv.validate(schema.schema, request.body);

        if (result) {
            next();
            return;
        }
        
        response.status(400).json({ message: "Invalid Request Format", errors: ajv.errors });
    }
};