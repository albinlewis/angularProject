const router = require('express').Router(),
    Job = require('../model/job'),
    User = require('../model/user'),
    rp = require('request-promise'),
    errors = require('../lib/errors'),
    config = require('config'),
    path = require('path'),
    fs = require('fs'),
    winston = require('winston'),
    randomstring = require('randomstring');

// Request from the User to our Server
function analysis(req, res) {
    let cropId = req.body.crop_id;

    let jobImage = req.files.image_file;
    let extension = req.files.image_file.name.split('.')[1];
    let filename = `${randomstring.generate()}.${extension}`;
    let relImagePath = '../assets/analysis/' + filename;
    let imagePath = path.resolve(__dirname, relImagePath);

    moveFile(jobImage, imagePath)
        .then(path => {
            const options = getOptionsFromRequest(req, path, filename);
            getRequestId(options)
                .then(request_id => {
                    winston.info(`result request_id ${request_id}`);
                    addJob(filename, cropId, request_id, req.tokenData)
                        .then(jobId => {
                            let counter = config.api.reload_counter;
                            let sent = false;
                            let interval = setInterval(() => {
                                getResults(request_id)
                                    .then(data => {
                                        if (counter < 0) {
                                            winston.error(`Could not get result ${request_id} in time.`);
                                            clearInterval(interval);
                                            throw new errors.ResultTimeOutError('Result could not be fetched in time!');
                                        } else if (data.statusCode === 204) {
                                            winston.info(`Wait for result ${request_id}`);
                                            counter--;
                                        } else {
                                            sent = true;
                                            res.status(200);
                                            res.send({
                                                success: true,
                                                data: jobId
                                            });
                                            clearInterval(interval);
                                            completeJob(jobId, data.body);
                                        }
                                    }).catch(err => {
                                        winston.error(err);
                                        errors.sendError(res, err, 500);
                                    });
                            }, config.api.reload_timer);
                        });

                });
        }).catch(err => {
            winston.error(err);
            errors.sendError(res, err, 500);
        });
}

// Move imagefile from request into folder
function moveFile(file, destPath) {
    return new Promise(function (resolve, reject) {
        file.mv(destPath, err => {
            if (err) reject(err);
            else resolve(destPath);
        });
    });
}

// Get options for post request
function getOptionsFromRequest(req, imagePath, imageName) {
    return {
        method: "POST",
        uri: `${config.api.url}/disease_requests.json`,
        headers: {
            apikey: config.api.api_key,
            contentType: 'multipart/form-data'
        },
        formData: {
            crop_id: req.body.crop_id,
            notification_url: req.body.notification_url || config.base_url,
            notification_email: req.body.notification_email,
            //notification_token: req.body.notification_token,
            device_type: req.body.device_type || 'android',
            image_file: {
                value: fs.createReadStream(imagePath),
                options: {
                    filename: imageName,
                    contentType: 'image/jpg',
                }
            }
        },
        json: true
    };
}

// Get Request id Promise
function getRequestId(options) {
    return rp(options)
        .then(res => res.request_id);
}

// Get results by request id
function getResults(request_id) {
    const options = {
        method: "GET",
        uri: `${config.api.url}/disease_requests/getResults.json?request_id=${request_id}`,
        headers: {
            apikey: config.api.api_key
        },
        json: true,
        resolveWithFullResponse: true,
    };
    return rp(options).then(res => res);
}

function addJob(imageName, plantJob, resultIdJob, user = null) {
    // new Job
    let job = new Job({
        image_url: '/uploads/analysis/' + imageName,
        plant: plantJob,
        resultId: resultIdJob
    });

    // new job in the DB
    return job.save()
        .then(job => {
            winston.info(`Saved new job ${job._id}`);
            if (user) addToUser(user._id, job._id);
            return job._id;
        }).catch(err => {
            winston.error('Could not save Job', err);
        });
}

function completeJob(id, result) {
    Job.findByIdAndUpdate(id, {
            $set: {
                result: result,
                finish: true
            }
        }, {
            safe: true,
            upsert: true
        }).catch(err => {
            winston.error('Could not complete Job', err);
        });
}

function addToUser(userId, jobId) {
    User.findByIdAndUpdate(userId, {
            $push: {
                jobs: jobId
            }
        }, {
            safe: true,
            upsert: true
        })
        .then(user => {
            if (!user) throw new errors.DBError(`No user with id ${userId} found`);
            else winston.info(`Added job to user ${userId}.`);
        }).catch(err => {
            winston.warn("addToUser: " + err);
        });
}

function getJob(req, res) {
    let id = req.params.id;

    Job.findById(id).populate('result.disease_id', ['name', 'symptoms']).populate('plant',['name', 'image_url'])
        .then(job => {
            res.status(200);
            res.send({
                success: true,
                data: job
            });
        }).catch(err => {
            errors.sendError(res, err);
        });

}

module.exports = {
    analysis,
    getJob
};
