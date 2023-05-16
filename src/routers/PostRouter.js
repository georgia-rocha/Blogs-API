const express = require('express');
const { post } = require('../controllers/index');
const { validatenewPost, validateUpdatePost } = require('../middlewares/validationsPost');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  validatenewPost,
  post.createPost,
);

router.get(
  '/',
  validateToken,
  post.getPostsAll,
);

router.get(
  '/:id',
  validateToken,
  post.getPostById,
);

router.put(
  '/:id',
  validateToken,
  validateUpdatePost,
  post.updatePostById,
);

module.exports = router;