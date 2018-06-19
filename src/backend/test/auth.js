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
describe("Authentication", () => {
    // Clear the database before each run in this block
    beforeEach(done => {
        User.remove({}, () => {
            done();
        });
    });

    /**
     * Test the /POST register route
     */
    describe("/Post register", () => {
        it("Register a new user: should an auth token", done => {
            chai
                .request(server)
                .post("/api/register")
                .send(examples.user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.success.should.eq(true);
                    done();
                });
        });

        it("Doubled email: should get an error", done => {
            let user = new User(examples.user);
            user.save((err, user) => {
                chai
                    .request(server)
                    .post("/api/register")
                    .send({
                        name: 'Fritz fischer',
                        email: examples.user.email,
                        password: examples.user.password
                    })
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.success.should.eq(false);
                        res.body.should.have.property('error');
                        done();
                    });
            });
        });
    });

    /**
     * Test the /POST login route
     */
    describe("/Post login", () => {
        it("Correct password: should get an auth token", done => {
            let user = new User(examples.user);
            user.save((err, user) => {
                chai
                    .request(server)
                    .post("/api/login")
                    .send({
                        email: examples.user.email,
                        password: examples.user.password
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.success.should.eq(true);
                        res.body.should.have.property('token');
                        done();
                    });
            });
        });

        it("Incorrect password: should get an error", done => {
            let user = new User(examples.user);
            user.save((err, user) => {
                chai
                    .request(server)
                    .post("/api/login")
                    .send({
                        email: examples.user.email,
                        password: "Falsches Passwort"
                    })
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.success.should.eq(false);
                        res.body.should.have.property("error");
                        done();
                    });
            });
        });

        it("Incorrect user: should get an error", done => {
            chai
                .request(server)
                .post("/api/login")
                .send({
                    email: "falscheEmail@da.de",
                    password: "Password"
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.success.should.eq(false);
                    res.body.should.have.property("error");
                    done();
                });
        });
    });
});
