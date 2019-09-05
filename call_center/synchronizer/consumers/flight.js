const Flight = require('../../mongo/models/flight');

function listenNewFlightMessages(connection, channel) {

  channel.assertQueue(process.env.NEW_FLIGHTS_QUEUE, {
    durable: true
  });

  channel.bindQueue(process.env.NEW_FLIGHTS_QUEUE, process.env.FLIGHTS_EXCHANGE, process.env.NEW_FLIGHT_KEY);

  channel.consume(process.env.NEW_FLIGHTS_QUEUE, function (message) {
    const rawFlight = JSON.parse(message.content.toString());
    if (!rawFlight) {
      return
    }
    const flight = new Flight({
      refFlightId: rawFlight.id,
      ...rawFlight
    });

    flight.save().then(result => {
      console.log(`Info on external fligh with id ${rawFlight.id} is saved. New user: ${result._id}`);
      channel.ack(message);
    }).catch(error => {
      console.log(`Failed to create user info for external user with id ${rawFlight.id}. Error: ${error}`);
    });
  }, {
    noAck: false
  });
}

function listenUpdateFlightMessages(connection, channel) {

  channel.assertQueue(process.env.UPDATE_FLIGHTS_QUEUE, {
    durable: true
  });

  channel.bindQueue(process.env.UPDATE_FLIGHTS_QUEUE, process.env.FLIGHTS_EXCHANGE, process.env.UPDATE_FLIGHT_KEY);

  channel.consume(process.env.UPDATE_FLIGHTS_QUEUE, function (message) {
    const rawFlight = JSON.parse(message.content.toString());
    if (!rawFlight) {
      return
    }

    Flight.updateOne({
      refFlightId: rawFlight.id
    }, {
      $set: {
        ...rawFlight
      }
    }).then(result => {
      console.log(`Info on external flight with id ${rawFlight.id} is updated.`);
      channel.ack(message);
    }).catch(error => {
      console.log(`Failed to update user info for external user with id ${rawFlight.id}. Error: ${error}`);
    });
  }, {
    noAck: false
  });
}

function listenMessages(connection, channel) {
  listenNewFlightMessages(connection, channel);
  listenUpdateFlightMessages(connection, channel);
}

module.exports = listenMessages;