const Job = require('../model/job'),
    User = require('../model/user'),
    rp = require('request-promise'),
    errors = require('../lib/errors'),
    config = require('config'),
    path = require('path'),
    fs = require('fs'),
    winston = require('winston'),
    randomstring = require('randomstring');

/**
 * Function to start the analysis
 * 
 * 1. Save diseased image file under "../assets/analysis" with a random name
 * 2. Request the analisis from api --> Return request id
 * 3. Save job in database (If user is defined also store reference in user)
 * 4. If subsciption is in body --> "Push" Mode --> Return instantly (Result comes with push notification)
 * 5. Else try to get the result and return success=true if no 204 status code --> Then complete job
 * 
 * 
 * @param {*} req Request
 * @param {*} res Response
 */
async function analysis(req, res) {
    let cropId = req.body.crop_id;
    const subscription = req.body.subscription;

    let jobImage = req.files.image_file;
    let extension = req.files.image_file.name.split('.')[1];
    let filename = `${randomstring.generate()}.${extension}`;
    let relImagePath = '../assets/analysis/' + filename;
    let imagePath = path.resolve(__dirname, relImagePath);
    try {
        await moveFile(jobImage, imagePath);

        const options = getOptionsFromRequest(req, imagePath, filename);
        const request_id = (await rp(options)).request_id;
        winston.info(`result request_id ${request_id}`);

        const jobId = await addJob(filename, cropId, request_id, req.tokenData, subscription);
        if (subscription) {
            res.send({
                success: true,
                method: 'push',
                data: jobId
            });
        } else {
            const response = await getResults(request_id);

            if (response.statusCode === 204) {
                winston.error(`Could not get result ${request_id}.`);
                res.send({
                    success: false,
                    method: 'poll',
                    data: jobId
                });
            } else {
                res.status(200);
                res.send({
                    success: true,
                    method: 'poll',
                    data: jobId
                });
                completeJob(jobId, response.body);
            }
        }
    } catch (err) {
        winston.error(err);
        errors.sendError(res, err, 500);
    };
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
            notification_url: config.base_url + "/api/notifications/result",
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
    return rp(options);
}

// Adds job to database
function addJob(imageName, plantJob, resultIdJob, user = null, subscription = null) {
    // new Job
    let job = new Job({
        image_url: '/uploads/analysis/' + imageName,
        plant: plantJob,
        resultId: resultIdJob,
        subscription: subscription
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

// Finished job --> Update finish and result fields
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

// Update user if user is defined
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

/**
 * Get the job by params id
 * 
 * If job is already finished send to client
 * Else try to get the result from the api
 *      If result is now available save results to object and return to client
 *      Else return TimeOutError
 * 
 * @param {*} req Request
 * @param {*} res Response
 */
async function getJob(req, res) {
    let id = req.params.id;
    try {
        let job = await Job.findById(id).populate('result.disease_id', ['name', 'symptoms']).populate('plant', ['name', 'image_url']);

        if (!job) throw errors.DBError('Job could not be found');

        if (job.finish) {
            res.send({
                success: true,
                data: job
            });
        } else {

            const apiResponse = await getResults(job.resultId);

            if (apiResponse.statusCode === 204) {
                res.send({
                    success: false,
                    data: job._id
                });
            }
            else {
                job.result = apiResponse.body;
                job.finish = true;
                job = await job.save();
                job = await Job.findById(job._id).populate('result.disease_id', ['name', 'symptoms']).populate('plant', ['name', 'image_url'])

                res.send({
                    success: true,
                    data: job
                });
            }
        }
    } catch (err) {
        winston.error(err);
        errors.sendError(res, err);
    }

}

module.exports = {
    analysis,
    getJob
};
