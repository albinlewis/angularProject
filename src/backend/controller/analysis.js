const router  = require('express').Router(),
  fileUpload = require('express-fileupload'),
  Job = require('../model/job'),
  rp = require('request-promise'),
  os = require('os');

router.get('/', (req,res)=>{});
router.post('/', (req,res)=>{});


// Request from the User to our Server
function analysis (req, res) {
  if(!req.files)
    return res.status(400).send('No files were uploaded.');

  let jobImage = req.files.jobImg;
  let cropId = req.body.cropID;
  let email = req.body.emailAdresse;
  let opSystem = os.platform();

  let resultID = () => {

    const options = {
      method: "POST",
      uri: config.api.url + 'disease_requests.json',
      headers: {
        apikey: config.api.api_key
      },
      body: {
        notification_token: '5617ce45-46a9-47d6-ae2a-7a9432150330',
        device_type: opSystem,
        crop_id: 10000,
        //image_file : jobImage,
        //notification_url: https:spacenus-api.azurewebsites.net/products/notify.json,
        //notification_email: oliver.menschick@l-one.de
      },
      json: true,
    };

    rp(options).then(function(err, jobResponse){
      if(err)
        res.send(err + 'First');
      rp.get(config.api.url + 'disease_requests/getResults.json?request_id=' + jobResponse)
        .then(function (err, res) {
          if(err)
            res.send(err + 'Second');
          res.json(res);
        })
    });

  };

  // get function with the resultId to the server
  
}

module.exports = {
  analysis: analysis,
}
