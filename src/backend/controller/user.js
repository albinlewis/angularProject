const winston = require('winston');

const User = require('../model/user');
const errors = require('../lib/errors');

// ToDo: Implement profile update
async function update(req, res) {
    try {
        let newPassword = req.body.new_password;
        delete req.body.email;
        let updatedUser = Object.assign(req.user, req.body);

        updatedUser.save().then(user => {
            user = user.toObject();
            delete user.password;
            res.send({
                data: user
            });
        }).catch(err => {
            winston.error(err);
            errors.sendError(res, err);
        });
    } catch (err) {
        winston.error(err);
        errors.sendError(res, err);
    }
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
    update,
    remove
};
