// Load libraries and variables
const express = require('express');
const path = require('path');
const app = express();

// Middleware Setup
app.use(express.json({ extended: false })); // Add this line to parse JSON request bodies

// Define routes
app.use('/api/role', require('./routes/api/role'));
app.use('/api/staff', require('./routes/api/staff'));
app.use('/api/role_listing', require('./routes/api/role_listing'));
app.use('/api/skill', require('./routes/api/skill'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build')); // Serve static files from the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // Serve the index.html file for any other requests
  });
}

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

