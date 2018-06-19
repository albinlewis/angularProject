const nodemailer = require('nodemailer');
const logger = require('winston');
const errors = require('../lib/errors');

function email(req, res) {

    let sender = req.body.sender;
    let receiver = req.body.receiver;
    let subject = req.body.subject;
    let msg = req.body.message;


    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount().then(account => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        // create a setup message option
        let mailOptions = {
            from: sender,
            to: receiver,
            subject: subject,
            text: msg
        };

        // send the E-mail with sendMail using the defined transporter
        transporter.sendMail(mailOptions)
            .then(info => res.send({
                success: true,
                data: info
            }));
    }).catch(err => {
        winston.error(err);
        errors.sendError(err);
    });

}

module.exports = {
    email: email,
};
