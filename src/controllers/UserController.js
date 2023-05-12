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

module.exports = {
  createUser,
};
