const Joi = require('joi');

const Schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required().messages({
    'email.required': '"email" must be a valid email' }),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const validatenewUser = (req, res, next) => {
  const user = req.body;
  const { error } = Schema.validate(user);

  if (error) {
    console.log(error);
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = {
  validatenewUser,
};