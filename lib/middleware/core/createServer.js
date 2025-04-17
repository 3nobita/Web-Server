const createServer = require('./lib/startServer');
createServer({
  port: 3000,
  middlewares: [logger, bodyParser],
  routes: {
    GET: {
      '/': (req, res) => res.end('Hello from 39-server!'),
    }
  }
});
