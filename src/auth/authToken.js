const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '24h',
};

const generateToken = (user) => {
  const token = jwt.sign(user, JWT_SECRET, jwtConfig);
  
  return token;
};

module.exports = {
  generateToken,
};
