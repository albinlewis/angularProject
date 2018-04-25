const router = require('express').Router({mergeParams: true}),
      plantController = require('./plant'),
      diseaseController = require('./disease'),
      analysisController = require('./analysis'),
      historyController = require('./history');

module.exports = router;

router.get('/plants/:id', plantController.getPlant);
router.get('/plants', plantController.getPlants);


router.get('/diseases/:id', diseaseController.getDisease);
router.get('/diseases', diseaseController.getDiseases);

router.post('/analysis', analysisController.analysis);
router.get('/history/:id', historyController.history);


