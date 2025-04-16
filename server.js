const http = require('http');
const { URL } = require('url');
const logger = require('./middleware/logger');
const bodyParser = require('./middleware/bodyParser');
const serveHTML = require('./utils/serveHTML');
const routes = require('./routes');

const middlewares = [logger, bodyParser];
const port = require('./config/default').port;

const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    req.pathname = parsedUrl.pathname;
    req.query = parsedUrl.searchParams;

    // Run all middlewares
    let i = 0;
    function next() {
        if (i < middlewares.length) {
            middlewares[i++](req, res, next);
        } else {
            const handler = routes[req.method]?.[req.pathname];
            if (handler) return handler(req, res);
            serveHTML('404page.html', res);
        }
    }
    next();
});

server.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
});
