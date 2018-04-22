const router  = require('express').Router();

router.use('/plants', require('./plant'));
router.use('/diseases', require('./disease'));
router.use('/analysis', require('./analysis'));
router.use('/history', require('./history'));

module.exports = router;