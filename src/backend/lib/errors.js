const winston = require('winston');

/**
 * Custom error hierarchy to identify the single Errors, thorwn by the program
 */

/** Base Error Class */
class PseError {
    constructor(message, name="PseError", status=400, options={}){
        this.message = message;
        this.name = name;
        this.status = status;
        this.options = options;
    }
}
/** Error for Authentication */
class AuthError extends PseError{
    constructor(message, name="Authentication Error", status=401, options={}){
        super(message, name, status, options);
    }
}
/** Error on Response */
class OnResponseError extends PseError{
    constructor(message, name="Authentication Error", status=400, options={}){
        super(message, name, status, options);
    }
}
/** Error for invalid inputs/missing inputs */
class InputError extends PseError{
    constructor(message, name="Input Error", status=400, options={}){
        super(message, name, status, options);
    }
}

/** Error for timeouts */
class TimeoutError extends PseError{
    constructor(message, name="Timeout Error", status=400, options={}){
        super(message, name, status, options);
    }
}

/** Error for timeouts at getting results */
class ResultTimeOutError extends TimeoutError{
    constructor(message, name="Result Timeout Error", status=402, options={}){
        super(message, name, status, options);
    }
}

/** Error for timeouts at getting results */
class DBError extends PseError{
    constructor(message, name="DB error", status=500, options={}){
        super(message, name, status, options);
    }
}

/** Sends errors to client */
function sendError(res, err, status=null){

    let body = {
        success: false
    };

    if (err instanceof PseError){
        status = status || err.status || 400;
        body.error = {
            name: err.name,
            message: err.message
        };
    }else{
        status = 400;
        body.error = err;
    }

    try{
        res.status(status);
        res.send(body);
    }catch(e){
        winston.error(e);
    }
}

module.exports = {
    OnResponseError,
    PseError,
    AuthError,
    InputError,
    TimeoutError,
    ResultTimeOutError,
    DBError,
    sendError
};