/** Required packages  */
const mongoose = require('mongoose'),
  express = require('express'),
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  os = require('os'),
  path = require('path');

/** Get configuration */
process.env.NODE_CONFIG_DIR = __dirname + "/config/";
const config = require('config');

/** Express initialzer */
const app = express();

/** Provide static directory */
app.use('/uploads', express.static(path.join(__dirname, './assets')));

/** Initizialize logger  */
const winston = require('winston');
winston.level = process.env.LOG_LEVEL || 'info';

/** Bodyparser */
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

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


/** Initialize routes */
app.use('/api', require('./controller/routes'));

/** Start server */
app.listen(config.port, () => {
    console.log(`Listening on Port: ${config.port}`);
});

/** Exports */
module.exports = app;
