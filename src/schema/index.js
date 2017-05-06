"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var gps_schema_1 = require("./gps/gps.schema");
var trip_schema_1 = require("./trip/trip.schema");
var Ajv = require("ajv");
__export(require("./gps/gps.schema"));
__export(require("./trip/trip.schema"));
;
exports.SCHEMAS = {
    "GPS": { key: "gps.schema.json", schema: gps_schema_1.GPS_SCHEMA.GPS },
    "GPS_SET": { key: "gps-set.schema.json", schema: gps_schema_1.GPS_SCHEMA.GPS_SET },
    "TRIP": { key: "trip.schema.json", schema: trip_schema_1.TRIP_SCHEMA.TRIP },
    "TRIP_SET": { key: "trip-set.schema.json", schema: trip_schema_1.TRIP_SCHEMA.TRIP_SET }
};
exports.ajv = new Ajv();
for (var s in exports.SCHEMAS) {
    exports.ajv.addSchema(exports.SCHEMAS[s].schema, exports.SCHEMAS[s].key);
}
;
exports.SchemaMiddleware = function (schema, methods) {
    if (methods === void 0) { methods = ["POST"]; }
    return function (request, response, next) {
        if (methods.indexOf(request.method) < 0) {
            next();
            return;
        }
        var result = exports.ajv.validate(schema.schema, request.body);
        if (result) {
            next();
            return;
        }
        response.status(400).json({ message: "Invalid Request Format", errors: exports.ajv.errors });
    };
};
