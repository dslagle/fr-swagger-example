const chai = require("chai");
const http = require("chai-http");

const schema = new require("../public/schema/index");

const expect = chai.expect;
chai.use(http);

let Redis = require("./mock/redis").Redis;
let App = require("../public/app").App;

let redis;
let server;

describe("Sample Test", () => {
    before(() => {
        redis = new Redis();

        const app = new App(redis);
        app.run();
        server = app.server;
    });

    it("post valid /gps should return 200", (done) => {
        chai.request(server)
            .post("/gps")
            .send([{ DeviceID: 10, ActualDateTime: "a", ReceivedDateTime: "b", Latitude: 5, Longitude: 5, Heading: 45, Speed: 15 }])
            .end((err, response) => {
                expect(err, JSON.stringify(response.body)).to.be.null;
                expect(response).to.have.status(200);
                
                done();
            });
    });

    it("get /gps should return 200", (done) => {
        chai.request(server)
            .get("/gps")
            .end((err, response) => {
                expect(err).to.be.null;
                expect(response).to.have.status(200);

                done();
            });
    });

    it("get /gps should return valid GPS", (done) => {
        chai.request(server)
            .get("/gps")
            .end((err, response) => {
                expect(err).to.be.null;
                expect(schema.validator.validate(response.body, schema.SCHEMAS.GPS).valid).to.be.true;
                
                done();
            });
    });
});