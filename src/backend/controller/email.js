const nodemailer = require('nodemailer');
const winston = require('winston');
const errors = require('../lib/errors');
const path = require('path');
const fs = require('fs');

var transport;
createTransport();

/**
 * Creates a nodemailer transport
 * if environment variables EMAIL_USER & EMAIL_PASSWORD are set --> use gmail account
 * else use nodemailer test account
 */
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
            transport = nodemailer.createTransport({
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
/**
 * Send email method
 * 
 * Set the mailOptions contents
 * if post request contains content(job)
 *  Generate disease result outputs
 *  Add image as attachement if existent
 * 
 * @param {*} req 
 * @param {*} res 
 */
function email(req, res) {

    let sender = req.body.sender;
    let receiver = req.body.receiver;
    let subject = req.body.subject;
    let msg = req.body.message;
    let content = req.body.content;

    // create a setup message option
    let mailOptions = {
        from: process.env.EMAIL_USER || sender,
        to: receiver,
        subject: subject,
        text: msg
    };

    if(content){
        if(content.result){
            mailOptions.text += `This email was requested by ${sender}\n\n`;
            mailOptions.text += `Analysis results for ${content.plant.name} from https://psehda.herokuapp.com/:\n`;
            for(let r of content.result) {
                mailOptions.text += `${r.disease_id ? r.disease_id.name : 'No disease'} => ${r.confidence}\n`;
            }
        }
        if(content.image_url){
            const image_path = path.join(__dirname, '../assets/analysis', path.basename(content.image_url));
            if(fs.existsSync(image_path)){
                mailOptions.attachments = [{
                    filename: 'diseased_plant.jpg',
                    path: image_path
                }];
            }
        }
    }
    
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
};