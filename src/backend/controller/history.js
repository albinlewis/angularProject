const Job = require('../model/job'),
      errors = require('../lib/errors');


// have to set a User_Id on Job
function history(req, res) {
  Job.findById(req.params.id).select("-__V") // match with the useId
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
      res.status(400);
      res.send(err);
    });
}

module.exports = {
  history : history,
};
