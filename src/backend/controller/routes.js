const router  = require('express').Router();


router.use('/plants/:id', require('./plant').getPlant);
router.use('/plants', require('./plant').getPlants);


router.use('/diseases/:id', require('./disease').getDisease);
router.use('/diseases', require('./disease').getDiseases);

router.use('/analysis', require('./analysis'));
router.use('/history', require('./history'));

module.exports = router;