// Load libraries and variables
const express = require('express');
const connection= require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database

// Load routes
app.get('/', (req, res) => { res.send('API Running'); });

// Define routes
app.use('/api/role_listing', require('./routes/api/role_listing'));

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

