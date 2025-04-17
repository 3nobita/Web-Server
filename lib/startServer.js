// lib/startServer.js

const builtInAuth = require('./middleware/auth/builtInAuth');

function createServer({
  port = 3000,
  routes = {},
  middlewares = [],
  authToken = null, // <-- new
  publicRoutes = []
}) {
  const http = require('http');
  const { URL } = require('url');
  const serveHTML = require('./utils/serveHTML');
  const applyMiddlewares = require('./middleware/core/middlewareRunner');

  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    req.pathname = parsedUrl.pathname;
    req.query = parsedUrl.searchParams;

    function finalhandler() {
      const isPublic = publicRoutes.includes(req.pathname);
      
      if (!isPublic && authToken) {
        return builtInAuth(authToken)(req, res, () => {
          const handler = routes[req.method]?.[req.pathname];
          if (handler) return handler(req, res);
          serveHTML('404page.html', res);
        });
      }

      const handler = routes[req.method]?.[req.pathname];
      if (handler) return handler(req, res);
      serveHTML('404page.html', res);
    }

    applyMiddlewares(req, res, middlewares, finalhandler);
  });

  server.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
  });
}

module.exports = createServer;
