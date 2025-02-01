const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/characters');
const validation = require('../middleware/validation');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', charactersController.getAll);

router.get('/:id', charactersController.getSingle);

router.post('/', isAuthenticated, validation.saveCharacter, charactersController.createCharacter)

router.put('/:id', isAuthenticated, validation.saveCharacter, charactersController.updateCharacter)

router.delete('/:id', isAuthenticated, charactersController.deleteCharacter)


module.exports = router;