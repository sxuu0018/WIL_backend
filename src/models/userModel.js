const pool = require('../config/db'); // Import the database pool from the configuration file

// Function to find a user by their username
const findUserByUsername = async (username) => {
  // Query the "User" table for a user with the given username
  const res = await pool.query('SELECT * FROM "User" WHERE user_name = $1', [username]);
  
  // Return the first result row (user data)
  return res.rows[0];
};

// Function to create a new user
const createUser = async (username, password, isAdmin) => {
  // Insert a new user into the "User" table with the provided username, password, and admin status
  const res = await pool.query(
    'INSERT INTO "User" (user_name, user_pass, is_admin) VALUES ($1, $2, $3) RETURNING *',
    [username, password, isAdmin]
  );

  // Return the newly created user record
  return res.rows[0];
};

// Export the functions so they can be used in other parts of the application
module.exports = {
  findUserByUsername,
  createUser,
};
