const emailValidator = require('email-validator');

const auth = require('../lib/auth');
const User = require('../model/user');
const errors = require('../lib/errors');

/** Register a user by with his name, email and password */
function register(req, res) {
    let user = new User(req.body);
    try {
        if (!emailValidator.validate(user.email)) {
            throw new errors.InputError("Please enter valid email");
        }
        if (user.password < 8) {
            throw new errors.InputError('Password must be at least 8 characters!');
        }
    } catch (err) {
        errors.sendError(res, err);
        return;
    }

    user.save()
        .then(user => {
            res.status(201);
            res.send({
                success: true,
                message: `User ${user.email} successfully created`,
                token: setToken(user)
            });
        }).catch(err => {
            errors.sendError(res, err);
        });
}

/** Login a user by his email and password 
 * Returns a JWT Token
 * --> Validation in middleware */
function login(req, res) {
    res.send({
        success: true,
        message: "You successfully logged in!",
        token: setToken(req.user)
    });
}

/** Creates a token with user as hashed data */
function setToken(user) {

    let token = auth.createJWTToken({
        data: {
            _id: user.id,
            email: user.email
        }
    });
    return token;
}

module.exports = {
    register,
    login
};