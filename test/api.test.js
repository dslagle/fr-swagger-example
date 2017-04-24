const chai = require("chai");
const http = require("chai-http");

const schema = new require("../public/schema/index");

const server = require("../public/app").app;

chai.should();
chai.use(http);

describe("Sample Test", () => {
    it("get /gps should return 200", (done) => {
        chai.request(server)
            .get("/gps")
            .end((err, response) => {
                if (err) console.erro(err);
                else {
                    response.should.have.status(200);
                }

                done();
            });
    });

    it("get /gps should return valid GPS", (done) => {
        chai.request(server)
            .get("/gps")
            .end((err, response) => {
                if (err) console.erro(err);
                else {
                    schema.validator.validate(response.body, schema.SCHEMAS.GPS).valid.should.equal(true);
                }

                done();
            });
    });
});