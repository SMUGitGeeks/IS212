// Load libraries and variables
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Load routes
app.get('/', (req, res) => { res.send('API Running'); });

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

