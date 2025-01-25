const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/characters', require('./characters'));

module.exports = router;