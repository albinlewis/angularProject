const router  = require('express').Router();
const middleware = require('../lib/middleware');


router.get('/plants/:id', require('./plant').getPlant);
router.get('/plants', require('./plant').getPlants);


router.get('/diseases/:id', require('./disease').getDisease);
router.get('/diseases', require('./disease').getDiseases);

router.get('/analysis', require('./analysis'));
router.get('/history', middleware.verifyJWT_MW, require('./history').getHistory);

router.post('/test',  middleware.checkBody(["x", "z"]), (req, res) => { res.send("Anzeige"); });

router.post('/register', require('./user').register);
router.post('/login', require('./user').login);
router.delete('/user', middleware.verifyJWT_MW, require('./user').remove);

module.exports = router;