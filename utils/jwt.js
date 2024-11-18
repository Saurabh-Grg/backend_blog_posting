// utils/jwt.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = '9805bf5ab44c9cbdc1724cb9c51f07f2d74f814952ba23fab156173d6f69f4ba398c20f37e406ae9ff36af066c0b8a814ab1f3241753dd02a82e8b66672d05d3';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };