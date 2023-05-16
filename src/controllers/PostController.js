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

const getPostsAll = async (req, res) => {
  try {
    const blogPost = await postService.getPostsAll();

    if (blogPost.message) return res.status(404).json(blogPost);
    return res.status(200).json(blogPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postService.getPostById(id);
    if (post.message) return res.status(404).json(post);
      return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createPost,
  getPostsAll,
  getPostById,
};  