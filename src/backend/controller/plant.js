const Plant = require('../model/plant');
const logger = require('winston');

/** Get all plants with name and id */
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

/** Get single plant y id */
function getPlant(req, res){
    Plant.findById(req.params.id).select("-__v")
        .then(plant => {
            res.status(200);
            res.send({
                success: true,
                data: plant
            });
        })
      .catch(err => {
            res.status(400);
            res.send(err);

            logger.error(err);
        });
}

module.exports = {
    getPlant: getPlant,
    getPlants: getPlants
};
