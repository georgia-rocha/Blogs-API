const express = require('express');
const { user } = require('../controllers/index');
const { validatenewUser } = require('../middlewares/validationsUser');

const router = express.Router();

router.post(
  '/',
  validatenewUser,
  user.createUser,
);

module.exports = router;
