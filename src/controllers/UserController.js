const userService = require('../services/UserService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const token = await userService.createUser(displayName, email, password, image);

    if (token.message) return res.status(409).json(token);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getUserAll = async (req, res) => {
  try {
    const users = await userService.getUserAll();

    if (users.message) return res.status(404).json(users);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (user.message) return res.status(404).json(user);
      return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createUser,
  getUserAll,
  getUserById,
};
