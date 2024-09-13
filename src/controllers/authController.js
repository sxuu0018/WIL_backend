const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const blacklist = new Set(); // Basic in-memory token blacklist

// User registration
const register = async (req, res) => {
  const { username, password, isAdmin } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    const newUser = await createUser(username, hashedPassword, isAdmin);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
};

// User login
const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);

  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const validPassword = await comparePassword(password, user.user_pass);
  if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// Enhanced user logout
const logout = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    jwt.verify(token, process.env.JWT_SECRET); // Verify token before blacklisting
    blacklist.add(token); // Blacklist token

    res.json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Middleware to check if token is blacklisted
const isTokenBlacklisted = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (blacklist.has(token)) return res.status(401).json({ error: 'Token has been invalidated' });
  next();
};

module.exports = { register, login, logout, isTokenBlacklisted };
