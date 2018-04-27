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
describe("Users", () => {
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
        it("should GET a auth token", done => {
          chai
            .request(server)
            .post("/api/register")
            .send(examples.user)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.success.should.eq(true);
              res.body.should.have.property('token');
              done();
            });
        });
      });

      /**
       * Test the /POST login route
       */
      describe("/Post login", () => {
        it("should GET a auth token", done => {
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


        /**
         * Test the /DELETE user route
         */
        describe("/Delete user", () => {
          it("should return success true", done => {
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
        });
    });
});
