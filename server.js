// Load libraries and variables
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Load routes
app.get('/', (req, res) => { res.send('API Running'); });

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
