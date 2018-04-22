const router  = require('express').Router();
const Plant = require('../model/plant');
const logger = require('winston');

/** Get all plants with name and id */
router.get('/', getPlants);

/** Get single plant y id */
router.get('/:id', getPlant);


function getPlants(req, res){
    Plant.find({}, ["id", "name"])
        .then(plants => {
            res.status(200);
            res.send({
                success: true,
                data: plants
            });
        }).catch(err => {

        });
}

function getPlant(req, res){
    Plant.findById(req.params.id).select("-__v")
        .then(plant => {
            res.status(200);
            res.send({
                success: true,
                data: plant
            });
        }).catch(err => {
            res.status(400);
            res.send(err);
            
            logger.error(err);
        });
}

module.exports = router;