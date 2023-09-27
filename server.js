// Load libraries and variables
const express = require('express');
const connection= require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(express.json()); // Add this line to parse JSON request bodies

// Connect to database

// Load routes
app.get('/', (req, res) => { res.send('API Running'); });

// Define routes
app.use('/api/role', require('./routes/api/role'));
app.use('/api/staff', require('./routes/api/staff'));
app.use('/api/role_listing', require('./routes/api/role_listing'));
app.use('/api/skill', require('./routes/api/skill'));
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

