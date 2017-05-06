const chai = require("chai");
const http = require("chai-http");

const { SCHEMAS, ajv } = require("../public/schema/index");

const expect = chai.expect;
chai.use(http);

const mocks = require("./mock/index");
const App = require("../public/app").App;

const seedGPS = [{ DeviceID: 10, ActualDateTime: "a", ReceivedDateTime: "b", Latitude: 5, Longitude: 5, Heading: 45, Speed: 15 }];

let redis;
let server;

describe("Sample Test", () => {
    before(() => {
        redis = new mocks.Redis();

        const app = new App(redis);
        app.run();
        server = app.server;
    });

    it("post valid /gps should return 200", (done) => {
        chai.request(server)
            .post("/gps")
            .send(seedGPS)
            .end((err, response) => {
                expect(err, JSON.stringify(response.body)).to.be.null;
                expect(response).to.have.status(200);
                
                done();
            });
    });

    it("get /gps/:key should return valid gps with 200 OK", (done) => {
        const key = `${seedGPS[0].DeviceID}${seedGPS[0].ActualDateTime}`;
        redis.hmset(key, seedGPS);

        chai.request(server)
            .get(`/gps/${key}`)
            .end((err, response) => {
                expect(err).to.be.null;
                expect(response).to.have.status(200);
                expect(ajv.validate(SCHEMAS.GPS, response.body)).to.be.true;

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
                expect(ajv.validate(SCHEMAS.GPS, response.body)).to.be.true;
                
                done();
            });
    });
});