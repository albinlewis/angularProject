const Gardener = require('../model/gardener');
const logger = require('winston');



/** get all Gardener from the db */
function getGardeners(req, res) {
    Gardener.find({}, ["name", "adress", "email", "phone", "latitude", "longitude"])
        .then(gardeners => {
            res.status(200);
            res.send({
                success: true,
                data: gardeners
            });
        })
        .catch(err => {
            errors.sendError(res, err);
            logger.error(err);
        })
}

/** get Gardener by Id */
function getGardener(req, res) {
    Gardener.findById(req.params.id).select("-__v")
        .then(gardener => {
            res.status(200);
            res.send({
                success: true,
                data: gardener
            })
        })
        .catch(err => {
            res.status(400);
            res.send(err);
            logger.error(err)
        })
}

/** add gardener to the DB */
function postGardener(req, res) {
    let gName = req.body.name;
    let gAdresse = req.body.adress;
    let gEmail = req.body.email;
    let gPhone = req.body.phone;
    let gLatitude = req.body.latitude;
    let gLongitude = req.body.longitude;

    // new Gardener
    let newGardener = {
        name: gName,
        adress: gAdresse,
        email: gEmail,
        phone: gPhone,
        latitude: gLatitude,
        longitude: gLongitude
    };

    Gardener.findOneAndUpdate({
            name: gName
        }, newGardener, {
            upsert: true,
            new: true
        })
        .then(gardener => {
            logger.info("Saved a new gardener");
            res.status(200);
            res.send({success: true, data: gardener});
        })
        .catch(err => {
            res.status(400);
            logger.error("could'n saved new Gardener ", err);
        });
}

module.exports = {
    getGardeners,
    getGardener,
    postGardener
};
