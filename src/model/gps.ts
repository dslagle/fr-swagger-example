import { Moment } from "moment";

export class GPS {
    DeviceID: Number;
    ActualDateTime: String;
    ReceivedDateTime: String;
    Latitude: Number;
    Longitude: Number;
    Heading: Number;
    Speed: Number;

    EdgeId?: Number;
    Percent?: Number;
}