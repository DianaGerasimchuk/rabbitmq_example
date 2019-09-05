const mongoose = require('mongoose');

const flightSchema = mongoose.Schema({
  airline: {
    type: String,
    required: true
  },
  flightNumber: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  fromAirport: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  toAirport: {
    type: String,
    required: true
  },
  departureAt: {
    type: Date,
    required: true
  },
  arrivalAt: {
    type: Date,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    default: 0
  },
  refFlightId: {
    type: String,
    required: true
  }
});

const flight = mongoose.model('flight', flightSchema);

module.exports = flight;