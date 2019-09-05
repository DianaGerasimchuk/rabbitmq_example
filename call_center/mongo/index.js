const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on('error', (error) => {
  console.error('Unable to connect to MongoDB:', error);
});

mongoose.connection.on('open', () => {
  console.log('Connection to MongoDB has been established successfully.');
});

mongoose.connection.on('close', () => {
  console.log('Connection to MongoDB has closed.');
});