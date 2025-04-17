// web-server/ indexe.js 
const createServer = require('./lib/startServer');
const logger = require('./lib/middleware/logger');
const bodyParser = require('./lib/middleware/bodyParser');
const auth = require('./lib/middleware/auth/auth');
const routes = require('./lib/routes');
const port = require('./config/default').port;

const publicRoutes = ['/contact'];

createServer({
  port,
  middlewares: [logger, bodyParser],
  auth,
  publicRoutes,
  routes,
});

module.exports = createServer;