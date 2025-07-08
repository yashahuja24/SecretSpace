const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const path = require('path');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// API routes (define **before** frontend)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Serve static files from React frontend (ONLY if build folder exists)
const buildPath = path.join(__dirname, 'build');
const fs = require('fs');

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Serve index.html for unmatched routes (after APIs)
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.warn("⚠️ No build folder found. Frontend won't be served.");
}

// Start server
app.listen(port, () => {
  console.log(`✅ SecretSpace app listening on port ${port}`);
});
