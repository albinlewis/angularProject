/** Required packages  */
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

/** Get configuration */
process.env.NODE_CONFIG_DIR = __dirname + "/config/";
const config = require('config');

/** Express initialzer */
const app = express();

/** Provide static directory */
app.use(express.static('assets'));

/** Initizialize logger  */
const winston = require('winston');
winston.level = process.env.LOG_LEVEL || 'info';

/** Bodyparser */
app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

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
app.listen(config.port);

/** Exports */
module.exports = app;