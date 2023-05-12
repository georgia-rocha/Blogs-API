const { User } = require('../models');
const { generateToken } = require('../auth/authToken');

const createUser = async (displayName, email, password, image) => {
  const ifUser = await User.findOne({ where: { email } });
  if (ifUser) {
    return ({ message: 'User already registered' }); 
  }
  
  const newUser = await User.create({ displayName, email, password, image });

  if (!newUser) {
    return ({ message: 'Não é possível criar um novo usuário' });
  }
  const token = generateToken({ email, password });
  return token;
};

module.exports = {
  createUser,
};
