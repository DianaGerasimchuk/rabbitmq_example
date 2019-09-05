const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const registerRoutes = require('./routes/register');

const app = express();

app.use(bodyParser.json({
  limit: '6mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/register', registerRoutes);
app.use('/users', usersRoutes);
app.use('/*', (req, res) => {
  res.status(500).send({
    message: 'Failed to find resourse. Please contact administrator.'
  });
})

module.exports = app;