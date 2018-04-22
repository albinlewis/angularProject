const getPlants = require('./api').getPlantsFromApi;
const Plant = require("../model/plant");
const logger = require('winston');
const config = require('config');

getPlants(updateDatabasePlants);

setInterval(() => {
    getPlants(updateDatabasePlants, true);
}, config.timer.plants);

/** Updates or Inserts all plants in the database */
function updateDatabasePlants(plants){
    if(!(plants instanceof Array)){
        plants = [plants];
    }
    plants.forEach(plant => {
        Plant.findByIdAndUpdate(plant.id, plant, {upsert:true, new: true})
            .then(p => {
                logger.info("Upserted plant " + p.name + " with id " + p.id);
            }).catch(err => {
                logger.error(err);
            });
    });
}