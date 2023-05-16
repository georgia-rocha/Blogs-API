const { User } = require('../models');
const { generateToken } = require('../auth/authToken');

const LoginService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid fields');
  }
  const token = generateToken({ email, password, id: user.id });
  return token;
};

module.exports = LoginService;
