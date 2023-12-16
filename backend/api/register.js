const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing

const User = require('../models/user'); // Your user model

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  // Validate user data
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, name });
  await newUser.save();

  // Generate token and send success response
  const token = generateToken(newUser._id);
  res.json({ message: 'User registered successfully', token });
});

module.exports = router;
