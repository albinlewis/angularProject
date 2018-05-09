const User = require('../model/user'),
      errors = require('../lib/errors');


// have to set a User_Id on Job
function history(req, res) {
  
  User.findById(req.tokenData._id, ["jobs"]).populate({path: "jobs", select: "date"})
    .then(jobs => {
      res.status(200);
      res.send(
        {
          success: true,
          data: jobs,
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
