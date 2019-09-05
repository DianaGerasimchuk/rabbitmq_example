const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../index');

class Flight extends Model {}

Flight.init({
  airline: {
    type: Sequelize.STRING,
    allowNull: false
  },
  from: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fromAirport: {
    type: Sequelize.STRING,
    allowNull: false
  },
  to: {
    type: Sequelize.STRING,
    allowNull: false
  },
  toAirport: {
    type: Sequelize.STRING,
    allowNull: false
  },
  flightNumber: {
    type: Sequelize.STRING,
    allowNull: false
  },
  departureAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  arrivalAt: {
    type: Sequelize.DATE,
    allowNull: false
  },
  totalSeats: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  availableSeats: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  model: 'flight'
});

module.exports = Flight;