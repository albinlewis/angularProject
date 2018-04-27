const jwt = require('jsonwebtoken');
const config = require('config');

function verifyJWTToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || config.auth.secret, (err, decodedToken) => 
        {
            if (err || !decodedToken)
            {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
}

function createJWTToken(details){
    if(typeof details !== 'object') details = {};
    if(!details.maxAge || typeof details !== 'number') details.maxAge = config.auth.maxAge;
    if(!details.data || typeof details.data !== 'object') details.data = {};
    

    let token = jwt.sign({
        data: details.data
    }, process.env.JWT_SECRET || config.auth.secret, {
        expiresIn: details.maxAge,
        algorithm: 'HS256'
    });
    
    return token;
}

module.exports = {
    createJWTToken,
    verifyJWTToken
};