const express = require('express');
const { user } = require('../controllers/index');
const { validatenewUser } = require('../middlewares/validationsUser');
const { validateToken } = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  validatenewUser,
  user.createUser,
);

router.get(
  '/',
  validateToken,
  user.getUserAll,
);

module.exports = router;
