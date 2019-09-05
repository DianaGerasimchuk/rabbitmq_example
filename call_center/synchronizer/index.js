const amqplib = require('amqplib');

const listenUserMessages = require('./consumers/user');
const listenFlightMessages = require('./consumers/flight');

let connection;
let channel;

async function setup() {
  connection = await amqplib.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();

  channel.assertExchange(process.env.USERS_EXCHANGE, 'direct', {
    durable: true
  });

  listenUserMessages(connection, channel);
  listenFlightMessages(connection, channel);
}

setup().then(result => {
  console.log('Connection to RabbitMQ has been established successfully.');
}).catch(error => {
  console.error('Unable to connect to RabbitMQ:', error);
});

module.exports = {
  getConnection: () => {
    return connection;
  },
  getChannel: () => {
    return channel;
  }
};