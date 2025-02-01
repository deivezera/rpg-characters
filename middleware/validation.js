const validator = require('../helpers/validator');

const saveCharacter = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    race: 'required|string',
    classname: 'required|string',
    appearance: 'string',
    originStory: 'required|string',
    goals: 'required|string',
    personalityTraits: 'string',
    weaknesses: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveHistory = (req,res,next) => {
  const validationRule = {
    title: 'required|string',
    intro: 'required|string',
    description: 'required|string',
    world_description: 'string',
    challenge: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}

module.exports = {
  saveCharacter,
  saveHistory
};