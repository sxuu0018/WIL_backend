const express = require('express'); // Import the Express framework
const dotenv = require('dotenv'); // Import dotenv to handle environment variables
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const pool = require('./config/db'); // Import the database pool for database connections

dotenv.config(); // Load environment variables from the .env file
const app = express(); // Initialize an Express application

app.use(express.json()); // Middleware to parse incoming JSON requests

// Authentication routes (e.g., register, login, logout) under the /api/auth path
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000; // Set the server port, default to 5000 if not specified in environment variables

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
