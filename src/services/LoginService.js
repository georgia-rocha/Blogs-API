const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const LoginService = async ({ email, password }) => {
    const user = await User.findOne({ where: { email, password } });
    console.log(user);
  if (!user) {
    throw new Error('Invalid fields');
  }
  const token = jwt.sign({ email, password }, JWT_SECRET);
  return token;
};

module.exports = LoginService;
