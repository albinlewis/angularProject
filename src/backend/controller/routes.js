const router = require('express').Router({mergeParams: true}),
      plantController = require('./plant'),
      diseaseController = require('./disease'),
      analysisController = require('./analysis'),
      historyController = require('./history'),
	userController = require('./user'),
	authController = require('./auth'),
	middleware = require('../lib/middleware');

module.exports = router;

router.get('/plants/:id', plantController.getPlant);
router.get('/plants', plantController.getPlants);

router.get('/diseases/:id', diseaseController.getDisease);
router.get('/diseases', diseaseController.getDiseases);

router.post('/analysis', 
      middleware.checkBody(["crop_id"]),
      middleware.checkFiles(["image_file"]),
      middleware.verifyJWT_MW(false),
      analysisController.analysis);
router.get('/result/:id', 
      analysisController.getJob);
router.get('/history', middleware.verifyJWT_MW(), historyController.history);

// User function: registration, login, deleting and updating
router.post('/register', middleware.checkBody(['name', 'email', 'password'], true), authController.register);
router.post('/login', middleware.verifyLoginData, authController.login);
router.delete('/user', middleware.verifyJWT_MW(), middleware.verifyLoginData, userController.remove);

