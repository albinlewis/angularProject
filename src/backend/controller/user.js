const ValidationError = require('mongoose').ValidationError;
const auth = require('../lib/auth');
const User = require('../model/user');
const hasher = require('password-hash');
const emailValidator = require('email-validator');
const winston = require('winston');
const errors = require('../lib/errors');

function register(req, res){
    let newUser = new User();
    
    try{
        newUser.name = req.body.name;

        if(!emailValidator.validate(req.body.email)){
            throw "Please enter valid email";
        }
        
        newUser.email = req.body.email;

        if(req.body.password.length < 8){
            throw "Password must be 8 or more characters";
        }
        newUser.password = req.body.password;
    }
    catch(err){
        res.status(400);
        res.send({
            success: false,
            error: err
        });
        return;
    }

    newUser.save()
        .then(user => {

            res.status(201);
            res.send({
                success: true,
                message: `User ${user.email} successfully created`,
                token: setToken(user)
            });
        }).catch(err => {
            res.status(400);
            res.send(err);
        });
}

function login(req, res){
    User.findOne({email: req.body.email})
        .then( user => {
            
            if(user.verifyPassword(req.body.password)){
                
                res.send({
                    success: true,
                    message: "You successfully logged in!",
                    token: setToken(user)
                });
                
            }else{
                throw "Passwort is not valid.";
            }
        }).catch(err => {
            winston.error(err);
            res.status(400);
            res.send({
                success: false,
                error: err
            });
        });
}

function update(req, res){
    
}

function remove(req, res){
    let user = req.user;
    let password = req.body.password;
    User.findOne({_id: user.id, email: user.email})
        .then(user => {
            if(!user){
                throw new errors.OnResponseError('No valid user to token!');
            }
            else if(user.verifyPassword(password)){
                user.remove()
                    .then( result => {
                        res.send({
                            success: true,
                            message: "User successfully deleted"
                        });
                    })
                    .catch( err => {throw err; });
            }else{
                throw new errors.AuthError('Invalid Password!');
            }
        }).catch(err => {
            errors.sendError(res, err);
        });
}

function setToken(user){
    
    let token = auth.createJWTToken({
            data: { 
                id: user.id,
                email: user.email
            }
        });
    return token;
}

module.exports = {
    login,
    register,
    remove
};