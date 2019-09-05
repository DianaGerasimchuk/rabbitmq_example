const Flight = require('../mysql/models/flight');
const sequelize = require('../mysql/index');

getFlights = async () => {
  return await Flight.findAll();
}

getFlightById = async (flightId) => {
  return await Flight.findByPk(flightId);
}

createFlight = (flightInfo, cb) => {
  return Flight.create({
    ...flightInfo
  }).then(newFlight => {
    cb(null, newFlight);
  }).catch(error => {
    cb(error, null);
  });
}

updateFlight = (flightId, flightInfo, cb) => {
  return Flight.update({
    ...flightInfo
  }, {
    where: {
      id: flightId
    }
  }).then(result => {
    cb(null, result);
  }).catch(error => {
    cb(error, null);
  });
}

module.exports = {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight
}