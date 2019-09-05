const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../index');
const User = require('./user');
const Flight = require('./flight');

class UserFlight extends Model {}

UserFlight.init({
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  flightId: {
    type: Sequelize.INTEGER,
    references: {
      model: Flight,
      key: 'id'
    }
  },
  ticketPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  seatNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  seatType: {
    type: Sequelize.STRING,
    defaultValue: 'Economy class'
  }
}, {
  sequelize,
  model: 'user_flight',
  tableName: "user_flights",
  hooks: {
    // beforeCreate(userFlight) {
    //   return Flight.findByPk(userFlight.flightId).then(flight => {
    //     if (flight.availableSeats == 0) {
    //       return Promise.reject(new Error("User can not be registered on this flight. No seats available"));
    //     }
    //     return Promise.resolve();
    //   });
    // }
  }
});

module.exports = UserFlight;