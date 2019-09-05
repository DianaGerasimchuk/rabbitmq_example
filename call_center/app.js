const express = require('express');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users');
const flightsRoutes = require('./routes/flights');

const app = express();

app.use(bodyParser.json({
  limit: '6mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/users', usersRoutes);
app.use('/flights', flightsRoutes);
app.use('/*', (req, res) => {
  res.status(500).send({
    message: 'Failed to find resourse. Please contact administrator.'
  });
})

module.exports = app;