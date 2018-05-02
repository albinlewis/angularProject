const verifyJWTToken = require('./auth').verifyJWTToken;
const errors = require('../lib/errors');
const winston = require('winston');
const User = require('../model/user');

/** Checks Query fields for required fields 
 * strictMode: only allow the given fields, no others
*/
function checkQuery(params, strictMode = false) {
    return (req, res, next) => {
        try {
            checkRequiredKeys(req.query, params, strictMode);
            next();
        } catch (err) {
            errors.sendError(res, err);
        }
    };
}
/** Checks Body fields for required fields 
 * strictMode: only allow the given fields, no others
*/
function checkBody(params, strictMode = false) {
    return (req, res, next) => {
        try {
            checkRequiredKeys(req.body, params, strictMode);
            next();
        } catch (err) {
            errors.sendError(res, err);
        }
    };
}

/** Checks Files fields for required fields 
 * strictMode: only allow the given fields, no others
*/
function checkFiles(params, strictMode = false) {
    return (req, res, next) => {
        try {
            checkRequiredKeys(req.files, params, strictMode);
            next();
        } catch (err) {
            errors.sendError(res, err);
        }
    };
}

/** Checks Header fields for required fields 
 * strictMode: only allow the given fields, no others
*/
function checkHeaders(params, strictMode = false) {
    return (req, res, next) => {
        try {
            checkRequiredKeys(req.headers, params, strictMode);
            next();
        } catch (err) {
            errors.sendError(res, err);
        }
    };
}

/** Checks Object fields for required fields 
 * strictMode: only allow the given fields, no others
*/
function checkRequiredKeys(base, params, strictMode=false) {
    if (!Array.isArray(params)) params = [params];

    if (strictMode && Object.keys(base).length > params.length) throw new errors.InputError('Unknown fields are set', 'Too many declarations');

    params.forEach(key => {
        if (!base[key] && base[key] !== false) {
            throw new errors.InputError(`The field ${key} is required!`, "Missing Options");
        }
    });
    return true;
}

/** Middleware for verifying the JWT as Bearer Token in the "Authorization" Field of the header 
 * Sets the encrypted data 
*/
function verifyJWT_MW(req, res, next) {
    let auth = req.headers.authorization;

    if (!auth || auth.split(' ')[0] != "Bearer") {
        let notSetError = new errors.AuthError("No bearer token in headers provided!");
        errors.sendError(res, notSetError);
    } else {
        let token = auth.split(' ')[1];

        verifyJWTToken(token)
            .then(decodedToken => {
                req.tokenData = decodedToken.data;
                next();
            }).catch(err => {
                let invalidError = new errors.AuthError("Invalid bearer token!");
                errors.sendError(res, invalidError);
                winston.error(err);
            });
    }

}

/** Verifies the provided login data
 * If token is provided search user by the tokens data
 * If no token is provided: Email and Passwort are required fields in body
 * 
 * Tries to find user in DB 
 *      if existing: req.user = user
 *      else: Authentication Error
 */
function verifyLoginData(req, res, next) {
    let search;
    
    try {
        if (!req.tokenData) {
            checkRequiredKeys(req.body, ["email", "password"]);
            search = {
                email: req.body.email
            };
        } else {
            checkRequiredKeys(req.body, ["password"]);
            search = req.tokenData;
        }
        
        User.findOne(search)
            .then(user => {
                if(!user){
                    throw new errors.AuthError('No user with this credentials');
                }else if (!user.verifyPassword(req.body.password)) {
                    throw new errors.AuthError('Invalid Password');
                }
                req.user = user;
                next();
            }).catch(err => {
                errors.sendError(res, err);
            });

    } catch (err) {
        errors.sendError(res, err);
    }
}

module.exports = {
    checkBody,
    checkQuery,
    verifyJWT_MW,
    verifyLoginData
};
