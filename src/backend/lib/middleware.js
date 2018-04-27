const verifyJWTToken = require('./auth').verifyJWTToken;
const errors = require('../lib/errors');
const winston = require('winston');

function checkQuery(params){
    return (req, res, next) => {
        try {
            checkRequiredKeys(req.query, params);
            next();
        }catch(err){
            errors.sendError(res, err);
        }
    };
}

function checkBody(params){
    return (req, res, next) => {
        try {
            checkRequiredKeys(req.body, params);
            next();
        }catch(err){
            errors.sendError(res, err);
        }
    };
}

function checkHeaders(params){
    return (req, res, next) => {
        try {
            checkRequiredKeys(req.headers, params);
            next();
        }catch(err){
            errors.sendError(res, err);
        }
    };
}

function checkRequiredKeys(base, params){
    if(!Array.isArray(params)) params = [params];
    
    params.forEach(key => {
        if(!base[key]) {
            throw new errors.OnResponseError(`The field ${key} is required!`, "Missing Options");  
        }
    });
    return true;
}

function verifyJWT_MW(req, res, next){
    let auth = req.headers.authorization;
    
    if(!auth || auth.split(' ')[0] != "Bearer"){
        let notSetError = new errors.AuthError("No bearer token in headers provided!");
        errors.sendError(res, notSetError);
    }else{
        let token = auth.split(' ')[1];
        
        verifyJWTToken(token)
        .then( decodedToken => {
            req.user = decodedToken.data;
            next();
        }).catch(err => {
            let invalidError = new errors.AuthError("Invalid bearer token!");
            errors.sendError(res, invalidError);
            winston.error(err);
        });
    }
    
}

module.exports = {
    checkBody,
    checkQuery,
    verifyJWT_MW
};