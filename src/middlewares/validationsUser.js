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

/* const userModel = require('../models/User');

const validateName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  const ifUser = await userModel.findOne({ where: { email } });
  if (ifUser) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  next();
};
 */
/* module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
 */