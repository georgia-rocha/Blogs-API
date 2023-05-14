const express = require('express');
const { category } = require('../controllers/index');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validateToken,
  category.createCategory,
);

router.get(
  '/',
  validateToken,
  category.getCategoriesAll,
);

module.exports = router;
