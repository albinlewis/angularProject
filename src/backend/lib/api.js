const config = require('config');
const rp = require('request-promise');
const logger = require('winston');

/**
 * Fetches Data from api
 * 
 * @param {*} path relative url to specanus api url
 * @param {*} callback Callback method to handle received data
 */
module.exports.getDataFromApi = function(path, callback){
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