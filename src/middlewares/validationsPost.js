const Joi = require('joi');

const Schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required().messages({
    categoryIds: 'one or more "categoryIds" not found' }),
});

const validatenewPost = (req, res, next) => {
    const post = req.body;
    const { error } = Schema.validate(post);
  
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Some required fields are missing',
      });
    }
    next();
  };

  const SchemaUp = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const validateUpdatePost = (req, res, next) => {
    const update = req.body;
    const { error } = SchemaUp.validate(update);
  
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: 'Some required fields are missing',
      });
    }
    next();
  };
  
  module.exports = {
    validatenewPost,
    validateUpdatePost,
  };