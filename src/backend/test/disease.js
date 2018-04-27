/** Packages */
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

/** Imports */
const server = require("../server");
const Disease = require("../model/disease");
const examples = require("./examples");

/** chai.js plugins */
chai.use(chaiHttp);


/** Tests */
describe("Diseases", () => {
    // Clear the database before each run in this block
    beforeEach(done => {
        Disease.remove({}, () => {
            done();
        });
    });


    /**
     * Test the /GET diseases route
     */
    describe("/GET diseases", () => {
        it("Getting all diseases", done => {
            chai
                .request(server)
                .get("/api/diseases")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    res.body.should.have.property('data');
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.eql(0);
                    done();
                });
        });
    });

    /**
     * Test the /GET diseases/:id route
     */
    describe("/GET diseases/:id", () => {
        it("Getting a single disease", done => {
            let disease = new Disease(examples.disease);
            disease.save(function (err, disease) {
                chai
                    .request(server)
                    .get("/api/diseases/" + disease.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.success.should.eql(true);
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        res.body.data._id.should.eq(examples.disease._id);
                        res.body.data.should.have.property('name');
                        done();
                    });
            });

        });
    });
});
