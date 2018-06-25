const pushWeb = require('web-push');
const Job = require('../model/job');
const config = require('config');
const rp = require('request-promise');
const winston = require('winston');

function postNotification (req, res) {
    const subscription = req.body.subscription;
    console.log(subscription);
    const notificationPayload = {
        notification: {
            title: "You`re result is there!",
            body: "We received the results for your analysed plant!",
            icon: '/uploads/icon.png',
            vibrate: [100, 50, 100],
            data: {
                url: "/result/" + req.body.job
            }
        }
    };

    winston.info("Sending push notification!");
    pushWeb.sendNotification(subscription, JSON.stringify(notificationPayload))
        .catch(err => winston.error(err));
}

function sendPushNotification(job){
    const url = `/result/${job._id}`;

    const notificationPayload = {
        notification: {
            title: "You`re result is there!",
            body: `We received the results for your analysed plant! You con find the result at ${config.base_url + url}`,
            icon: '/uploads/icon.png',
            vibrate: [100, 50, 100],
            data: {
                url: url
            }
        }
    };
    winston.info("Sending push notification!");
    
    pushWeb.sendNotification(JSON.parse(job.subscription), JSON.stringify(notificationPayload))
        .catch(err => winston.error(err));
}

/**
 * Receive the result from spacenus api
 * if job has a subscriptio, send push notification
 * else only update db entry
 * 
 */
async function receiveFromApi(req, res){
    try{
        res.end();
        const requestId = req.body.request_id;

        const options = {
            method: "GET",
            uri: `${config.api.url}/disease_requests/getResults.json?request_id=${requestId}`,
            headers: {
                apikey: config.api.api_key
            },
            json: true,
            resolveWithFullResponse: true,
        };

        winston.info(`Received push notification for request ${requestId}`);

        let job = await Job.findOne({resultId: requestId});
        
        if(!job.finish){
            const apiResponse = await rp(options);
            if(apiResponse.statusCode === 200){
                
                job.result = apiResponse.body;
                job.finish = true;
                
                job = await job.save();
                console.log(job._id + " fetched and saved");
                if(job.subscription) sendPushNotification(job);
            }else{
                winston.error(`Response statuscode of api is ${apiResponse.statusCode}`);
            }
        }else{
            winston.error(`Request ${requestId} is already finished`);
        }
    }catch(err){
        winston.error(err);
    }

}

module.exports = {
    postNotification,
    receiveFromApi
};
