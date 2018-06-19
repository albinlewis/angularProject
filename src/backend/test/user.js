/** Packages */
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const should = chai.should();
const passwordHash = require('password-hash');
const winston = require('winston');

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
    describe("/POST users/delete", () => {
        it("Delete existing user: should return success true", done => {
            /** First register user */
            chai
                .request(server)
                .post("/api/register")
                .send(examples.user)
                .end((err, res) => {
                    chai
                        .request(server)
                        .post("/api/login")
                        .send(examples.user)
                        .end((err, res) => {
                            chai
                                .request(server)
                                .post("/api/users/delete")
                                .set("Authorization", "Bearer " + res.body.token)
                                .send(examples.user)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.success.should.eql(true);
                                    done();
                                });
                        });
                });
        });

        it("Try to delete without token: should return error", done => {
            new User(examples.user).save(function (err, user) {
                chai
                    .request(server)
                    .post("/api/users/delete")
                    .send(examples.user)
                    .end((err, res) => {
                        res.should.have.status(401);
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
                        .post("/api/login")
                        .send(examples.user)
                        .end((err, res) => {
                            chai
                                .request(server)
                                .post("/api/users/delete")
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

    /**
     * Test the /PATCH user route
     */
    describe("/PATCH users", () => {
        it("Update password: should return success true and login with new password", done => {
            /** First register user */
            chai
                .request(server)
                .post("/api/register")
                .send(examples.user)
                .end((err, res) => {
                    chai
                        .request(server)
                        .post("/api/login")
                        .send(examples.user)
                        .end((err, res) => {
                            chai
                                .request(server)
                                .patch("/api/users")
                                .set("Authorization", "Bearer " + res.body.token)
                                .send({
                                    password: examples.user.password,
                                    new_password: "neuespasswort"
                                })
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.success.should.eql(true);
                                    res.body.should.have.property('data');

                                    let updated = examples.user;
                                    updated.password = "neuespasswort";

                                    chai
                                        .request(server)
                                        .post("/api/login")
                                        .send(updated)
                                        .end((err, res) => {
                                            res.should.have.status(200);
                                            res.body.success.should.eql(true);
                                            res.body.should.have.property('token');
                                            res.body.should.have.property('data');
                                            done();
                                        });
                                });
                        });
                });
        });

        it("Try to update without token: should return error", done => {
            new User(examples.user).save(function (err, user) {
                chai
                    .request(server)
                    .patch("/api/users")
                    .send({
                        password: "Falsches passwort",
                        new_password: "neuespasswort"
                    })
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.success.should.eql(false);
                        res.body.should.have.property("error");
                        done();
                    });
            });
        });
    });
});
