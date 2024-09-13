const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// User logout route
router.post('/logout', logout);

// Export the router
module.exports = router;

