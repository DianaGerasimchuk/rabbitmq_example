const routes = require('express').Router();
const flightService = require('../services/flight');
const { publishNewFlightMessage, publishUpdateFlighMessage } = require('../synchronizer/producers/flight');

routes.get('/', async (req, res) => {
  const flights = await flightService.getFlights();
  res.send({
    flights
  });
});

routes.get('/:id', async (req, res) => {
  const flight = await flightService.getFlightById(req.params.id);
  res.send({
    flight
  });
});

routes.post('/', (req, res) => {
  flightService.createFlight(req.body, (error, newFlight) => {
    if (error) {
      return res.status(500).send({
        message: error.message
      });
    }
    publishNewFlightMessage(newFlight);
    return res.send({
      newFlight
    });
  })
});

routes.put('/:id', (req, res) => {
  flightService.updateFlight(req.params.id, req.body, (error, result) => {
    if (error) {
      return res.status(500).send({
        message: error.message
      });
    }
    publishUpdateFlighMessage({
      id: req.params.id,
      ...req.body
    });
    return res.send({
      result
    });
  })
});

module.exports = routes;