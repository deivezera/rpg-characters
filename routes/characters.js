const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/characters');
const validation = require('../middleware/validation');

router.get('/', charactersController.getAll);

router.get('/:id', charactersController.getSingle);

router.post('/', validation.saveCharacter, charactersController.createCharacter)

router.put('/:id', validation.saveCharacter, charactersController.updateCharacter)

router.delete('/:id', charactersController.deleteCharacter)


module.exports = router;