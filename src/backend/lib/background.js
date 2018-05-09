const getData = require('./api').getDataFromApi;
const Plant = require("../model/plant");
const Disease = require("../model/disease");
const logger = require('winston');
const config = require('config');

//getData("/crops.json", updateDatabasePlants);
//getData("/diseases.json", updateDatabaseDiseases);

setInterval(() => {
    getData("/crops.json", updateDatabasePlants, true);
}, config.timer.plants);

setInterval(() => {
    getData("/diseases.json", updateDatabaseDiseases, true);
}, config.timer.diseases);


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

/** Updates or Inserts all diseases in the database */
function updateDatabaseDiseases(diseases){
    if(!(diseases instanceof Array)){
        diseases = [diseases];
    }
    diseases.forEach(disease => {
        Disease.findByIdAndUpdate(disease.id, disease, {upsert:true, new: true})
            .then(d => {
                logger.info("Upserted disease " + d.name + " with id " + d.id);
            }).catch(err => {
                logger.error(err);
            });
    });
}