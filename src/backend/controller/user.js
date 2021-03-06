const winston = require('winston');

const User = require('../model/user');
const errors = require('../lib/errors');

function getUser(req, res){
    User.findById(req.tokenData._id)
        .then(user => {
            user = user.toObject();
            delete user.password;
            res.send({
                success: true,
                data: user
            })
        }).catch(err => {
            winston.error(err);
            errors.sendError(err);
        });
}


function update(req, res) {
    let update = req.body;
    delete update.email;
    if (update.new_password) update.password = update.new_password;
    else delete update.password;
    let updatedUser = Object.assign(req.user, update);

    updatedUser.save().then(user => {
        user = user.toObject();
        delete user.password;
        res.send({
            success: true,
            data: user
        });
    }).catch(err => {
        winston.error(err);
        errors.sendError(res, err);
    });
}

/** Remove a user */
function remove(req, res) {
    let user = req.user;
    user.remove()
        .then(result => {
            res.send({
                success: true,
                message: "User successfully deleted"
            });
        })
        .catch(err => {
            errors.sendError(res, err);
            winston.error(err);
        });
}

module.exports = {
    getUser,
    update,
    remove
};
