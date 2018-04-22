const router  = require('express').Router();
const Disease = require('../model/disease');
const logger = require('winston');

/** Get all diseases with name and id */
router.get('/', getDiseases);

/** Get single disease y id */
router.get('/:id', getDisease);


function getDiseases(req, res){
    Disease.find({}, ["id", "name", "symptoms"])
        .then(diseases => {
            res.status(200);
            res.send({
                success: true,
                data: diseases
            });
        }).catch(err => {

        });
}

function getDisease(req, res){
    Disease.findById(req.params.id).select("-__v")
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

module.exports = router;