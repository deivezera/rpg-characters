const express = require('express');
const router = express.Router();

const historiesController = require('../controllers/histories');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', historiesController.getAll);

router.get('/:id', historiesController.getSingle);

router.post('/',isAuthenticated , validation.saveHistory, historiesController.createHistory)

router.put('/:id', isAuthenticated, validation.saveHistory, historiesController.updateHistory)

router.delete('/:id', isAuthenticated, historiesController.deleteHistory)


module.exports = router;