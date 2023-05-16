const express = require('express');
const { post } = require('../controllers/index');
const { validatenewPost } = require('../middlewares/validationsPost');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  post.createPost,
);

module.exports = router;