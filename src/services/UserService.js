const { User, BlogPost } = require('../models');
const { generateToken } = require('../auth/authToken');

const createUser = async (displayName, email, password, image) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    return ({ message: 'User already registered' }); 
  }
  
  const newUser = await User.create({ displayName, email, password, image });

  if (!newUser) {
    return ({ message: 'Não é possível criar um novo usuário' });
  }
  const token = generateToken({ email, password, id: newUser.id });
  return token;
};

const getUserAll = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  console.log(users);

  if (!users.length) {
    return ({ message: 'Nenhum User encontrado' });
  }
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
  console.log(user, 'user');

  if (!user) {
    return ({ message: 'User does not exist' });
  }
  return user;
};

const deleteMe = async (userId) => {
  try {
    await BlogPost.destroy({ where: { userId } });

    const deleteUser = await User.destroy({ where: { id: userId } });
   
    return deleteUser;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getUserAll,
  getUserById,
  deleteMe,
};
