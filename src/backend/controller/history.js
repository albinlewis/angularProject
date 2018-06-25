const User = require('../model/user'),
      errors = require('../lib/errors');


/**
 * Get User history
 * Only accessible if token is provided
 * 
 * @param {*} req 
 * @param {*} res 
 */
function history(req, res) {
  
  User.findById(req.tokenData._id, ["jobs"]).populate("jobs", ["date", "plant", "finish"]).populate("jobs.crop_id", ["name"])
    .then(user => {
      res.status(200);
      res.send(
        {
          success: true,
          data: user.jobs,
        }
      );
    })
    .catch(err => {
      errors.sendError(res, err);
    });
}

module.exports = {
  history : history,
};
