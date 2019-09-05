const routes = require('express').Router();
const flightService = require('../services/flights');

routes.get('/:id', async (req, res) => {
  const flight = await flightService.getFlightById(req.params.id);
  res.send({
    flight
  });
});

routes.get('/', async (req, res) => {
  const limit = req.query.limit || 10;
  const skip = req.query.skip || 0;
  const flights = await flightService.getFlights(limit, skip);
  res.send({
    flights
  });
});

module.exports = routes;