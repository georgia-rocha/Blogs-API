const jwt = require('jsonwebtoken');
const postService = require('../services/PostService');

const { JWT_SECRET } = process.env;
const ERROR_MESSAGE = 'Algo deu errado';

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
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const getPostsAll = async (req, res) => {
  try {
    const blogPost = await postService.getPostsAll();

    if (blogPost.message) return res.status(404).json(blogPost);
    return res.status(200).json(blogPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_MESSAGE });
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
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const updatePostById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, JWT_SECRET);
    
    if (Number(id) !== Number(user.id)) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const updated = await postService.updatePostById(id, title, content);
    if (updated.message) return res.status(404).json(updated.message);

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const deletePostById = async (req, res) => {
const { id } = req.params;
try {
  const token = req.headers.authorization;
  const user = jwt.verify(token, JWT_SECRET);
  const post = await postService.getPostById(id);

  if (post.message) return res.status(404).json(post);

  if (Number(post.userId) !== Number(user.id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  const deletePost = await postService.deletePostById(id);
  if (deletePost.message) return res.status(404).json(deletePost);

  return res.status(204).json();
} catch (error) {
  console.log(error);
  return res.status(500).json({ message: ERROR_MESSAGE });
}
};

module.exports = {
  createPost,
  getPostsAll,
  getPostById,
  updatePostById,
  deletePostById,
};  