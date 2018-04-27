/** Packages */
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const should = chai.should();
const passwordHash = require('password-hash');

/** Imports */
const server = require("../server");
const User = require("../model/user");
const examples = require("./examples");

/** chai.js plugins */
chai.use(chaiHttp);


/** Tests */
describe("User", () => {
    // Clear the database before each run in this block
    beforeEach(done => {
        User.remove({}, () => {
            done();
        });
    });


    /**
     * Test the /DELETE user route
     */
    describe("/DELETE user", () => {
        it("Delete existing user: should return success true", done => {
            /** First register user */
            chai
                .request(server)
                .post("/api/register")
                .send(examples.user)
                .end((err, res) => {
                    chai
                        .request(server)
                        .delete("/api/user")
                        .set("Authorization", "Bearer " + res.body.token)
                        .send(examples.user)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.success.should.eql(true);
                            done();
                        });
                });
        });

        it("Try to delete without token: should return error", done => {
            new User(examples.user).save(function (err, user) {
                chai
                    .request(server)
                    .delete("/api/user")
                    .send(examples.user)
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.success.should.eql(false);
                        res.body.should.have.property("error");
                        done();
                    });
            });
        });

        it("Delete existing user with bad credentials: should return an error", done => {
            chai
                .request(server)
                .post("/api/register")
                .send(examples.user)
                .end((err, res) => {
                    chai
                        .request(server)
                        .delete("/api/user")
                        .set("Authorization", "Bearer " + res.body.token)
                        .send({
                            email: examples.user.email,
                            password: "Falsches Passwort"
                        })
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.success.should.eql(false);
                            res.body.should.have.property("error");
                            done();
                        });
                });
        });
    });
});
