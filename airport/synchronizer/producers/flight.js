const {
  getChannel
} = require('../index');

function publishNewFlightMessage(flightInfo) {
  getChannel().publish(process.env.FLIGHTS_EXCHANGE, process.env.NEW_FLIGHT_KEY, Buffer.from(JSON.stringify(flightInfo)), {
    persistent: true
  });
}

function publishUpdateFlighMessage(flightInfo) {
  getChannel().publish(process.env.FLIGHTS_EXCHANGE, process.env.UPDATE_FLIGHT_KEY, Buffer.from(JSON.stringify(flightInfo)), {
    persistent: true
  });
}

module.exports = {
  publishNewFlightMessage,
  publishUpdateFlighMessage
}