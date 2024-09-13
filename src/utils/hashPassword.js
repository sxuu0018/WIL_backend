const bcrypt = require('bcryptjs'); // Import the bcryptjs library for hashing and comparing passwords

// Function to hash a password
// Takes a plain-text password as input and returns a hashed version of it
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with a cost factor of 10
  return await bcrypt.hash(password, salt); // Hash the password using the generated salt and return it
};

// Function to compare a plain-text password with a hashed password
// Returns true if the input password matches the hashed password, otherwise false
const comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword); // Compare the input password with the hashed password
};

// Export the hashPassword and comparePassword functions for use in other parts of the application
module.exports = { hashPassword, comparePassword };
