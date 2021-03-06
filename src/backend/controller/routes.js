const router = require('express').Router({
        mergeParams: true
    }),
    plantController = require('./plant'),
    diseaseController = require('./disease'),
    analysisController = require('./analysis'),
    historyController = require('./history'),
    userController = require('./user'),
    authController = require('./auth'),
    gardenerController = require('./gardener'),
    notificationController = require('./notification'),
    emailController = require('./email'),
    middleware = require('../lib/middleware');

module.exports = router;

//Plants routes
router.get('/plants/:id', plantController.getPlant);
router.get('/plants', plantController.getPlants);

// Disease routes
router.get('/diseases/:id', diseaseController.getDisease);
router.get('/diseases', diseaseController.getDiseases);

// Gardeners routes
router.get('/gardeners', gardenerController.getGardeners);
router.get('/gardeners/:id', gardenerController.getGardener);
router.post('/gardeners', gardenerController.postGardener);

// Receive post from api
router.post('/notifications/result', notificationController.receiveFromApi);

// Send an email 
router.post('/email', middleware.checkBody(["sender", "receiver", "subject", "message"]), emailController.email);

// start the analysis
router.post('/analysis',
    middleware.checkBody(["crop_id"]),
    middleware.checkFiles(["image_file"]),
    middleware.verifyJWT_MW(false),
    analysisController.analysis);

// REquest the result by its id
router.get('/result/:id',
    analysisController.getJob);

// Get user history
router.get('/history', middleware.verifyJWT_MW(), historyController.history);

// Authentification function: registration, login
router.post('/register', middleware.checkBody(['name', 'email', 'password'], true), authController.register);
router.post('/login', middleware.verifyLoginData, authController.login);

// User functions - Verification by AuthToken
router.get('/users',
    middleware.verifyJWT_MW(),
    userController.getUser);

router.post('/users/delete',
    middleware.verifyJWT_MW(),
    middleware.verifyLoginData,
    userController.remove);

router.patch('/users',
    middleware.checkBody(['password']),
    middleware.verifyJWT_MW(),
    middleware.verifyLoginData,
    userController.update);
