const amqplib = require('amqplib');

let connection;
let channel;

async function setup() {
  connection = await amqplib.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();

  channel.assertExchange(process.env.FLIGHTS_EXCHANGE, 'direct', {
    durable: true
  });
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