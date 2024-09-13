const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const pool = require('./config/db');

dotenv.config();
const app = express();

app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
