const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing

const User = require('../models/user'); // Your user model

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate token and send success response
  const token = generateToken(user._id);
  res.json({ message: 'Logged in successfully', token });
});

module.exports = router;
