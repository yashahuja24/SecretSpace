const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
const buildPath = path.join(__dirname, 'build');

if (fs.existsSync(buildPath)) {
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  console.warn("⚠️ Frontend build folder not found. Skipping static serving.");
}
app.listen(port, () => {
  console.log(`✅ SecretSpace app listening on port ${port}`);
});
