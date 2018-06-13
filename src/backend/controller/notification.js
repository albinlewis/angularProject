const pushWeb = require('web-push');

function postNotification (req, res) {
    const subscription = req.body;

    let notifactionTitle = "";
    let notifactionBody = "";

    res.send(200).json({});
    const notificationPayload = {
        'notification' : {
            'title': notifactionTitle,
            'body': notifactionBody,
            'icon': '',
            'vibrate': [100, 50, 100]
        }
    };
    console.log(subscription);

    pushWeb.sendNotification(subscription, notificationPayload)
        .then(() => {
            console.log('Notification sent successfully');
        })
        .catch(error => {
        console.log(error.stack);
    });
}

module.exports = {
    postNotification: postNotification,
};
