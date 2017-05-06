import { GPS } from "../model/gps";
import { Redis } from "ioredis";

/**
 * Methods on this class have been declared as variables set to lambda functions to preserve the 'this'
 * keyword. Alternatively a 'self' reference could have been maintained.
 * 
 * @export
 * @class GPSController
 */
export class GPSController {
    constructor(private _redis: Redis) { }

    PostGPSHandler = (request, response) => {
        const gps: GPS[] = request.body;
        const batch = this._redis.multi();
        
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
    };

    GetGPSByKeyHandler = (request, response) => {
        this._redis.hgetall(request.params.key, (err, obj) => {
            if (err) {
                response.status(500).json({ error: err });
            }
            else {
                response.json(obj);
            }
        });
    };

    GetGPSHandler = (request, response) => {
        response.json({ DeviceID: 10, ActualDateTime: "", ReceivedDateTime: "", Heading: 10, Speed: 55, Latitude: 33.567, Longitude: -128.456 });
    };
}