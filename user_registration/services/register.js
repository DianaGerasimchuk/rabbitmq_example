const UserFlight = require('../mysql/models/userFlight');
const Flight = require('../mysql/models/flight');

function registerUserOnFligh(registrationInfo, cb) {
  UserFlight.create(registrationInfo).then((result) => cb(null, result)).catch(error => {
    cb(error.message, null);
  });
}

module.exports = {
  registerUserOnFligh
}