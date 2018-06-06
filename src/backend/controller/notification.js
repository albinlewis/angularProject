const pushWeb = require('web-push');

function postNotification (req, res) {
    const subscription = req.body;
    res.send(200).json({});
    const payload = JSON.stringify({title: "test"});
    console.log(subscription);

    pushWeb.sendNotification(subscription, payload).catch(error => {
        console.log(error.stack);
    });
}

module.exports = {
    postNotification: postNotification,
};
