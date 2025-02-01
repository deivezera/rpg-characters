const mongodb = require('../data/database');
const AppError = require('../helpers/AppError');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=['Histories']
  const result = await mongodb.getDatabase().db().collection('histories').find();
  result.toArray()
    .then((histories) => {
      if(!histories.length){
        return next(new AppError('history not found', 404));
      }
      res.setHeader('Contenct-Type', 'application/json');
      res.status(200).json(histories);
    })
}

const getSingle = async (req,res, next) => {
  //#swagger.tags=['Histories']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('histories').find({ _id: userId });
  result.toArray()
    .then((histories) => {
      if(!histories.length){
        return next(new AppError('History not found', 404));
      }
      res.setHeader('Contenct-Type', 'application/json');
      res.status(200).json(histories[0]);
    })
}

const createHistory = async (req,res, next) => {
  //#swagger.tags=['Histories']
  const { title, intro, description, world_description, challenge } = req.body;
  const history = {
    title,
    intro,
    description,
    world_description,
    challenge
  }

  const response = await mongodb.getDatabase().db().collection('histories').insertOne(history);
  if(response.acknowledged > 0) {
    res.status(204).send();
  } else {
    return next(new AppError(response.error || 'Some error occurred while creating your histories', 500));
  }
}

const updateHistory = async (req,res, next) => {
  //#swagger.tags=['Histories']
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError('Must use a valid history id to update a history.', 400));
  }
  const historyId = new ObjectId(req.params.id);
  const { title, intro, description, world_description, challenge } = req.body;
  const history = {
    title,
    intro,
    description,
    world_description,
    challenge
  }

  const response = await mongodb.getDatabase().db().collection('histories').replaceOne({_id: historyId }, history);
  if(response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    return next(new AppError(response.error || 'Some error occurred while updating your history', 500));
  }
}

const deleteHistory = async (req,res, next) => {
  //#swagger.tags=['Histories']
  if (!ObjectId.isValid(req.params.id)) {
    return next(new AppError('Must use a valid history id to delete a history.', 400));
  }
  const historyId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('histories').deleteOne({_id: historyId } , true);
  if(response.deletedCount > 0) {
    res.status(204).send();
  } else {
    return next(new AppError(response.error || 'Some error occurred while creating history', 500));
  }
}


module.exports = {
  getAll,
  getSingle,
  createHistory,
  updateHistory,
  deleteHistory
}