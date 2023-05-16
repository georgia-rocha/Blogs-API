const Joi = require('joi');

const Schema = Joi.object({
  tittle: Joi.string().required(),
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
  
  module.exports = {
    validatenewPost,
  };