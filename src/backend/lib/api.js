const config = require('config');
const rp = require('request-promise');
const logger = require('winston');

module.exports.getDataFromApi = function(path, callback, modified=false){
    const options = {
        method: "GET",
        uri: config.api.url + path,
        headers: {
            apikey: config.api.api_key
        },
        json: true
    };

    rp(options)
        .then(result => {
            callback(result);
        }).catch(err => {
            logger.error(err);
        });
};