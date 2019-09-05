const Flight = require('../mongo/models/flight');

getFlightById = async (flightId) => {
  return await Flight.findById(flightId);
}

getFlights = async (limit, skip) => {
  return await Flight.find({}).limit(limit).skip(skip);
}

module.exports = {
  getFlightById,
  getFlights
}