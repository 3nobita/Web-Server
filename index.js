const createServer = require('./lib/middleware/core/createServer');
module.exports = { createServer };

// index.js (at root level of your npm package)

const createServer = require('./lib/startServer');

module.exports = {
  createServer
};
