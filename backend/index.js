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

// API routes first
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Serve frontend static build
app.use(express.static(path.join(__dirname, 'build')));

// Serve frontend for all unmatched routes (after API)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`SecretSpace app listening on port ${port}`);
});
