/** Packages */
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

/** Imports */
const server = require("../server");
const Plant = require("../model/plant");
const examples = require("./examples");

/** chai.js plugins */
chai.use(chaiHttp);


/** Tests */
describe("Plants", () => {
    // Clear the database before each run in this block
    beforeEach(done => {
        Plant.remove({}, () => {
            done();
        });
    });


    /**
     * Test the /GET plants route
     */
    describe("/GET plants", () => {
        it("Getting all plants", done => {
            chai
                .request(server)
                .get("/api/plants")
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
     * Test the /GET plants/:id route
     */
    describe("/GET plants/:id", () => {
        it("Getting a single plant", done => {
            let plant = new Plant(examples.plant);
            plant.save(function (err, plant) {
                chai
                    .request(server)
                    .get("/api/plants/" + plant.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.success.should.eql(true);
                        res.body.should.have.property('data');
                        res.body.data.should.be.a('object');
                        res.body.data._id.should.eq(examples.plant._id);
                        res.body.data.should.have.property('name');
                        done();
                    });
            });

        });
    });
});
