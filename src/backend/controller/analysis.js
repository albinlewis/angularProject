const router = require('express').Router(),
    fileUpload = require('express-fileupload'),
    Job = require('../model/job'),
    rp = require('request-promise'),
    os = require('os'),
    config = require('config'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');


router.get('/', (req, res) => {
});
router.post('/', (req, res) => {
});


// Request from the User to our Server
function analysis(req, res) {
    //if(!req.files)
    //return res.status(400).send('No files were uploaded.');
    let  resultIdJob;
    let plantId = 1000;



    let jobImage = req.files.image_file;
    let cropId = req.body.crop_id;
    //let email = req.body.emailAdresse;
    //let opSystem = os.platform();
    let imageName = jobImage.name;
    let destPath = path.resolve(__dirname, '../assets/analysis', imageName);
    jobImage.mv(destPath);
    let imagePath = destPath.replace(/\\/g, '/');

    const options = {
        method: "POST",
        uri: config.api.url + '/disease_requests.json',
        headers: {
            apikey: config.api.api_key
        },
        formData: {
            notification_url: 'localhost',
            crop_id: cropId,
            device_type: 'android',
            image_file: fs.createReadStream(imagePath)
        },
        //notification_url: https:spacenus-api.azurewebsites.net/products/notify.json,
        //notification_email: oliver.menschick@l-one.de

        json: true,
    };

    rp(options)
        .then(jobResponse => {
            console.log(jobResponse);
            resultIdJob = jobResponse.request_id;
            const options2 = {

                method: "GET",
                uri: config.api.url + '/disease_requests/getResults.json?request_id=' + jobResponse.request_id,
                headers: {
                    apikey: config.api.api_key
                },
                json: true,
                resolveWithFullResponse: true,
            }
            rp(options2)
                .then(data => {
                    res.status(data.statusCode);
                    res.json(data.body);
                    // add Job
                    addJob (imagePath, plantId, resultIdJob);
                })
        })
        .catch(err => {
            res.send(err);
        });


}

function addJob (imageUrlJob, plantJob, resultIdJob) {
    // new Job
    let job = Job({
        image_url: imageUrlJob,
        plant: plantJob,
        resultId: resultIdJob
    });

    // new job in the DB
    job.save({}, (err, newJob) => {
        if(err)
            console.log(err);
        console.log("a new job was add");

    })
}

module.exports = {
    analysis: analysis,
}
