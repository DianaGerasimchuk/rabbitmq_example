const User = require('../../mongo/models/user');
const Flight = require('../../mongo/models/flight');

function listenNewUserMessages(connection, channel) {

  channel.assertQueue(process.env.NEW_USERS_QUEUE, {
    durable: true
  });

  channel.bindQueue(process.env.NEW_USERS_QUEUE, process.env.USERS_EXCHANGE, process.env.NEW_USERS_KEY);

  channel.consume(process.env.NEW_USERS_QUEUE, function (message) {
    const rawUser = JSON.parse(message.content.toString());
    if (!rawUser) {
      return
    }
    const user = new User({
      refUserId: rawUser.id,
      fullName: `${rawUser.firstname} ${rawUser.lastname}`,
      phone: rawUser.phone,
      email: rawUser.email,
      fullAddress: `${rawUser.Address.country}, ${rawUser.Address.city}, ${rawUser.Address.address}, ${rawUser.Address.postcode}`,
      flights: []
    });

    user.save().then(result => {
      console.log(`User info on external user with id ${rawUser.id} is saved. New user: ${result._id}`);
      channel.ack(message);
    }).catch(error => {
      console.log(`Failed to create user info for external user with id ${rawUser.id}. Error: ${error}`);
    });
  }, {
    noAck: false
  });
}

function listenUpdateUserMessages(connection, channel) {

  channel.assertQueue(process.env.UPDATE_USERS_QUEUE, {
    durable: true
  });

  channel.bindQueue(process.env.UPDATE_USERS_QUEUE, process.env.USERS_EXCHANGE, process.env.UPDATE_USER_KEY);

  channel.consume(process.env.UPDATE_USERS_QUEUE, function (message) {
    const rawUser = JSON.parse(message.content.toString());
    if (!rawUser) {
      return
    }

    User.updateOne({
      refUserId: rawUser.id
    }, {
      $set: {
        fullName: `${rawUser.firstname} ${rawUser.lastname}`,
        phone: rawUser.phone,
        email: rawUser.email,
        fullAddress: `${rawUser.Address.country}, ${rawUser.Address.city}, ${rawUser.Address.address}, ${rawUser.Address.postcode}`,
      }
    }).then(result => {
      console.log(`User info on external user with id ${rawUser.id} is updated.`);
      channel.ack(message);
    }).catch(error => {
      console.log(`Failed to update user info for external user with id ${rawUser.id}. Error: ${error}`);
    });
  }, {
    noAck: false
  });
}

function listenUserFlightMessage(connection, channel) {

  channel.assertQueue(process.env.USER_FLIGHTS_QUEUE, {
    durable: true
  });

  channel.bindQueue(process.env.USER_FLIGHTS_QUEUE, process.env.USERS_EXCHANGE, process.env.USER_FLIGHT_KEY);

  channel.consume(process.env.USER_FLIGHTS_QUEUE, function (message) {
    const rawUserFlight = JSON.parse(message.content.toString());
    if (!rawUserFlight) {
      return
    }

    Flight.findOne({
      refFlightId: rawUserFlight.flightId
    }).then(flight => {
      if (!flight) {
        console.log(`No flight with ${rawUserFlight.flightId} is found`);
        return;
      }

      return User.updateOne({
        refUserId: rawUserFlight.userId
      }, {
        $push: {
          flights: {
            flightRef: flight._id,
            ticketPrice: rawUserFlight.ticketPrice,
            seatNumber: rawUserFlight.seatNumber,
            seatType: rawUserFlight.seatType,
          }
        }
      });
    }).then(result => {
      console.log(result && result.nModified > 0 ? `Info on user fligh with external id ${rawUserFlight.userId} is added.` : `No user with external id ${rawUserFlight.userId} is found`);
      channel.ack(message);
    }).catch(error => {
      console.log(`Failed to update user flighs info with external id ${rawUserFlight.userId} . Error: ${error}`);
    });
  }, {
    noAck: false
  });
}

function listenMessages(connection, channel) {
  listenNewUserMessages(connection, channel);
  listenUpdateUserMessages(connection, channel);
  listenUserFlightMessage(connection, channel);
}

module.exports = listenMessages;