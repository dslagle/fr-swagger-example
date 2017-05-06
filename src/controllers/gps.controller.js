"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Methods on this class have been declared as variables set to lambda functions to preserve the 'this'
 * keyword. Alternatively a 'self' reference could have been maintained.
 *
 * @export
 * @class GPSController
 */
var GPSController = (function () {
    function GPSController(_redis) {
        var _this = this;
        this._redis = _redis;
        this.PostGPSHandler = function (request, response) {
            var gps = request.body;
            var batch = _this._redis.multi();
            for (var _i = 0, gps_1 = gps; _i < gps_1.length; _i++) {
                var g = gps_1[_i];
                batch.hmset("" + g.DeviceID + g.ActualDateTime, g);
            }
            batch.exec(function (err) {
                if (err) {
                    response.status(500).json({ error: err });
                }
                else {
                    response.status(200).json({ success: "true" });
                }
            });
        };
        this.GetGPSByKeyHandler = function (request, response) {
            _this._redis.hgetall(request.params.key, function (err, obj) {
                if (err) {
                    response.status(500).json({ error: err });
                }
                else {
                    response.json(obj);
                }
            });
        };
        this.GetGPSHandler = function (request, response) {
            response.json({ DeviceID: 10, ActualDateTime: "", ReceivedDateTime: "", Heading: 10, Speed: 55, Latitude: 33.567, Longitude: -128.456 });
        };
    }
    return GPSController;
}());
exports.GPSController = GPSController;
