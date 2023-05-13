const express = require('express');
const { category } = require('../controllers/index');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  category.createCategory,
);

module.exports = router;
