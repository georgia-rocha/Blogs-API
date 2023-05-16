const express = require('express');
const { post } = require('../controllers/index');
const { validatenewPost } = require('../middlewares/validationsPost');
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

module.exports = router;