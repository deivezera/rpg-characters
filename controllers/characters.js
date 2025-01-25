const mongodb = require('../data/database');
const AppError = require('../helpers/AppErrors');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Characters']
  const result = await mongodb.getDatabase().db().collection('characters').find();
  result.toArray()
    .then((characters) => {
      if(!characters.length){
        throw new AppError('No characters found', 404);
      }
      res.setHeader('Contenct-Type', 'application/json');
      res.status(200).json(characters);
    })
}

const getSingle = async (req,res, next) => {
  //#swagger.tags=['Characters']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('characters').find({ _id: userId });
    result.toArray()
      .then((characters) => {
        if(!characters.length){
          throw new AppError('Character not found', 404);
        }
        res.setHeader('Contenct-Type', 'application/json');
        res.status(200).json(characters[0]);
      })
  } catch(error){
    next(error)
  }

}

const createCharacter = async (req,res) => {
  //#swagger.tags=['Characters']
  try {
    const { name, race, classname, appearance, originStory, goals, personalityTraits, weaknesses } = req.body;
    const character = {
      name,
      race,
      classname,
      appearance,
      originStory,
      goals,
      personalityTraits,
      weaknesses
    }
  
    const response = await mongodb.getDatabase().db().collection('characters').insertOne(character);
    if(response.acknowledged > 0) {
      res.status(204).send();
    } else {
      throw new AppError(response.error || 'Some error occurred while creating character', 500);
    }
  } catch(error) {
    next(error)
  }

}

const updateCharacter = async (req,res) => {
  //#swagger.tags=['Characters']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      throw new AppError('Must use a valid character id to update a character.', 400);
    }
    const characterId = new ObjectId(req.params.id);
    const { name, race, classname, appearance, originStory, goals, personalityTraits, weaknesses } = req.body;
    const character = {
      name,
      race,
      classname,
      appearance,
      originStory,
      goals,
      personalityTraits,
      weaknesses
    }
  
    const response = await mongodb.getDatabase().db().collection('characters').replaceOne({_id: characterId }, character);
    if(response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new AppError(response.error || 'Some error occurred while creating character', 500);
    }
  } catch(error) {
    next(error);
  }

}

const deleteCharacter = async (req,res) => {
  //#swagger.tags=['Characters']
  try{
    if (!ObjectId.isValid(req.params.id)) {
      throw new AppError('Must use a valid character id to delete a character.', 400);
    }
    const characterId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('characters').deleteOne({_id: characterId } , true);
    if(response.deletedCount > 0) {
      res.status(204).send();
    } else {
      throw new AppError(response.error || 'Some error occurred while creating character', 500);
    }
  } catch(error){
    next(error);
  }
}


module.exports = {
  getAll,
  getSingle,
  createCharacter,
  updateCharacter,
  deleteCharacter
}