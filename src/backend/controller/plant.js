const Plant = require('../model/plant');
const logger = require('winston');
const errors = require('../lib/errors');
const Disease = require('../model/disease');

/** Get all plants with name and id */
function getPlants(req, res){
    Plant.find({}).select("-__v")
        .then(plants => {
            res.status(200);
            res.send({
                success: true,
                data: plants
            });
        }).catch(err => {
            errors.sendError(res, err);
            logger.error(err);
        });
}

/** Get single plant y id */
function getPlant(req, res){
    Plant.findById(req.params.id).select("-__v")
        .then(plant => {
            if(!plant) throw new errors.DBError(`Plant with id ${req.params.id} does not exist.`, 'Not Found', 404);
            else{
                Disease.find({crop_id: plant._id}, ["name", "eppo_code"]).then(diseases => {
                    
                    plant = plant.toObject();
                    plant.diseases = diseases;
                    res.status(200);
                    res.send({
                        success: true,
                        data: plant
                    });
                });
            }
        })
      .catch(err => {
            errors.sendError(res, err);
            logger.error(err);
        });
}

module.exports = {
    getPlant,
    getPlants
};
