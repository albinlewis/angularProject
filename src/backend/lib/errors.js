class PseError {
    constructor(message, name="PseError", status=400, options={}){
        this.message = message;
        this.name = name;
        this.status = status;
        this.options = options;
    }
}

class AuthError extends PseError{
    constructor(message, status=400, name="Authentication Error", options={}){
        super(message, name, status, options);
    }
}

class OnResponseError extends PseError{
    constructor(message, status=400, name="Authentication Error", options={}){
        super(message, name, status, options);
    }
}

function sendError(res, err, status=400){

    let body = {
        success: false
    };

    if (err instanceof PseError){
        status = err.status || status;
        body.error = {
            name: err.name,
            message: err.message
        };
    }else{
        body.error = err;
    }
    res.status(status);
    res.send(body);
}

module.exports = {
    OnResponseError,
    PseError,
    AuthError,
    sendError
};