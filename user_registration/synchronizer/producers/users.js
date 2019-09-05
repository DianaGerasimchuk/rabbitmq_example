const {
  getChannel
} = require('../index');

function publishNewUserMessage(userInfo) {
  getChannel().publish(process.env.USERS_EXCHANGE, process.env.NEW_USER_KEY, Buffer.from(JSON.stringify(userInfo)), {
    persistent: true
  });
}

function publishUpdateUserMessage(userInfo) {
  getChannel().publish(process.env.USERS_EXCHANGE, process.env.UPDATE_USER_KEY, Buffer.from(JSON.stringify(userInfo)), {
    persistent: true
  });
}

module.exports = {
  publishNewUserMessage,
  publishUpdateUserMessage
}