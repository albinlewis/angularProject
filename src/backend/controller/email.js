const nodemailer = require('nodemailer');
const logger = require('winston');

function email(req, res) {

    var sender = req.body.sender;
    var receiver = req.body.receiver;
    var subject = req.body.subject;
    var msg = req.body.message;


    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
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
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                logger.error(err);
            }
            res.send(info);
        });
    });

}

module.exports = {
    email: email,
};
