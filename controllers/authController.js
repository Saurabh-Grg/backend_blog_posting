// controllers/authController.js
const User = require('../models/User');
const jwtUtils = require('../utils/jwt');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwtUtils.generateToken({ user_id: user.user_id });
    res.status(200).json({ token, user: { user_id: user.user_id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { loginUser };