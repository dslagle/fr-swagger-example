import { Moment } from "moment";

export class GPS {
    DeviceID: Number;
    ActualDateTime: Moment;
    ReceivedDateTime: Moment;
    Latitude: Number;
    Longitude: Number;
    Heading: Number;
    Speed: Number;

    EdgeId?: Number;
    Percent?: Number;
}