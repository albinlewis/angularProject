const nodemailer = require('nodemailer');

function email(req, res) {
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
            // sender infos
            from: '"Arthur" <arthur@yahoo.fr>',
            // receiver infos
            to: 'a_loic16@yahoo.fr',
            subject: 'nodemailer is cool',
            text: 'all Infos about Plantrecognition'
        };

        // send the E-mail with sendMail using the defined transporter
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                res.err(err);
            }
            res.send(info);
        });
    });

}

module.exports = {
    email: email,
};
