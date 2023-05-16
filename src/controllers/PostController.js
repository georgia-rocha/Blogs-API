const jwt = require('jsonwebtoken');
const postService = require('../services/PostService');

const { JWT_SECRET } = process.env;

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const token = req.headers.authorization;
    const user = jwt.verify(token, JWT_SECRET);

    const newPost = await postService.createPost(title, content, categoryIds, user.id);
    if (newPost.message) return res.status(400).json({ message: newPost.message });
    console.log(newPost);
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createPost,
};  