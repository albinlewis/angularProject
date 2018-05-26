const Disease = require('../model/disease');
const logger = require('winston');

/** Get all diseases with name and id */
function getDiseases(req, res){
    Disease.find({}, ["id", "name", "symptoms"])
        .then(diseases => {
            res.status(200);
            res.send({
                success: true,
                data: diseases
            });
        }).catch(err => {
            res.send(err);
        });
}

/** Get single disease by id */
function getDisease(req, res){
    Disease.findById(req.params.id).select("-__v").populate('crop_id', ['name'])
        .then(disease => {
            res.status(200);
            res.send({
                success: true,
                data: disease
            });
        }).catch(err => {
            res.status(400);
            res.send(err);
            
            logger.error(err);
        });
}

module.exports = {
    getDisease: getDisease,
    getDiseases: getDiseases
};