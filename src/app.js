const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Education Api is Ready' });
});

module.exports = app;
