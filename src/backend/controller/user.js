const winston = require('winston');

const User = require('../model/user');
const errors = require('../lib/errors');

// ToDo: Implement profile update
function update(req, res) {

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
