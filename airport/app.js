const express = require('express');
const bodyParser = require('body-parser');

const flightsRoutes = require('./routes/flight');

const app = express();

app.use(bodyParser.json({
  limit: '6mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/flights', flightsRoutes);
app.use('/*', (req, res) => {
  res.status(500).send({
    message: 'Failed to find resourse. Please contact administrator.'
  });
})

module.exports = app;