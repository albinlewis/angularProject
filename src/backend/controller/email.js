const nodemailer = require('nodemailer');
const winston = require('winston');
const errors = require('../lib/errors');

var transport;
createTransport();

async function createTransport() {
    try {
        const user = process.env.EMAIL_USER;
        const password = process.env.EMAIL_PASSWORD;

        if (user && password) {
            transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: user,
                    pass: password
                }
            });
        } else {
            winston.warn('No user gmail user defined in environment variables. User ethereal mail test account');
            let account = await nodemailer.createTestAccount();
            return nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass // generated ethereal password
                }
            });
        }
    } catch (err) {
        winston.error(err);
    }
}

function email(req, res) {

    let sender = req.body.sender;
    let receiver = req.body.receiver;
    let subject = req.body.subject;
    let msg = req.body.message;


    // create a setup message option
    let mailOptions = {
        from: process.env.EMAIL_USER || sender,
        to: receiver,
        subject: subject,
        text: msg
    };

    
    // send the E-mail with sendMail using the defined transporter
    transport.sendMail(mailOptions)
        .then(info => {
            res.send({
                success: true,
                data: info
            });
        }).catch(err => {
            winston.error(err);
            errors.sendError(err);
        });
}

module.exports = {
    email
}