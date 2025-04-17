const http = require('http');
const { URL } = require('url');
// const bodyParser = require('./middleware/bodyParser');
const bodyParser = require('./lib/middleware/bodyParser')
const serveHTML = require('./lib/utils/serveHTML');
const routes = require('./lib/routes');
const logger = require('./lib/middleware/logger');
const applyMiddlewares = require('./lib/middleware/core/middlewareRunner')
const auth = require('./lib/middleware/auth/auth')
const port = require('./config/default').port;

const middlewares = [logger, bodyParser];

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    req.pathname = parsedUrl.pathname;
    req.query = parsedUrl.searchParams;
    function finalhandler() {
        const publicRoutes = ['/contact'];
        const isPublic = publicRoutes.includes(req.pathname);
        if (!isPublic) {
            return auth(req, res, () => {
                const handler = routes[req.method]?.[req.pathname];
                if (handler) return handler(req, res);
                serveHTML('404page.html', res)
            })
        }
        const handler = routes[req.method]?.[req.pathname];
        if (handler) return handler(req, res);
        serveHTML('404page.html', res)
    }

    applyMiddlewares(req, res, middlewares, finalhandler)
})

server.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});

