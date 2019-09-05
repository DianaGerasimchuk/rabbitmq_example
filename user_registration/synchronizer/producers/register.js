const {
  getChannel
} = require('../index');

function publishUserFlightMessage(userFlightInfo) {
  getChannel().publish(process.env.USERS_EXCHANGE, process.env.USER_FLIGHT_KEY, Buffer.from(JSON.stringify(userFlightInfo)), {
    persistent: true
  });
}

module.exports = {
  publishUserFlightMessage
}