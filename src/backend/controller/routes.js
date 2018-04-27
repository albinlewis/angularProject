const router  = require('express').Router();
const middleware = require('../lib/middleware');


router.get('/plants/:id', require('./plant').getPlant);
router.get('/plants', require('./plant').getPlants);


router.get('/diseases/:id', require('./disease').getDisease);
router.get('/diseases', require('./disease').getDiseases);

router.get('/analysis', require('./analysis'));
//router.get('/history', middleware.verifyJWT_MW, require('./history').getHistory);

// User function: registration, login, deleting and updating
router.post('/register', middleware.checkBody(['name', 'email', 'password'], true), require('./auth').register);
router.post('/login', middleware.verifyLoginData, require('./auth').login);
router.delete('/user', middleware.verifyJWT_MW, middleware.verifyLoginData, require('./user').remove);

module.exports = router;