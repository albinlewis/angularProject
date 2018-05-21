/** Required packages  */
const mongoose = require('mongoose'),
  express = require('express'),
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  os = require('os'),
  path = require('path'),
  compression = require('compression');

/** Get configuration */
process.env.NODE_CONFIG_DIR = __dirname + "/config/";
const config = require('config');

/** Express initialzer */
const app = express();

/** Initizialize logger  */
const winston = require('winston');
winston.level = process.env.LOG_LEVEL || 'info';

// Gzip compression
app.use(compression());

/** Bodyparser */
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

if(process.env.NODE_ENV !== 'prod'){
  // Add headers
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
}

/** file-Upload */
app.use(fileUpload());

/** Connect to MongoDB */
mongoose.connect(config.db);

/** Register DB models */
require('./model/disease');
require('./model/job');
require('./model/plant');
require('./model/user');
require('./lib/background');

/** Provide static directory */
app.use(express.static(path.join(__dirname, '../../dist')));
app.use('/uploads', express.static(path.join(__dirname, './assets')));

/** Initialize routes */
app.use('/api', require('./controller/routes'));
app.use('*', function(req, res){
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

/** Start server */
let port = process.env.PORT || config.port;
app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});

/** Exports */
module.exports = app;
