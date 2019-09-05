const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');

const port = process.env.PORT || 3000;

require('./mysql');
//require('./synchronizer');

const server = http.createServer(app);

server.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
})