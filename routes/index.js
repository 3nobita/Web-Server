const serveHTML = require('../utils/serveHTML');

module.exports = {
    GET: {
        '/': (req, res) => {
            if (req.query.get('json') === 'true') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Home JSON response' }));
            } else {
                serveHTML('index.html', res);
            }
        },
        '/about': (req, res) => serveHTML('about.html', res),
        '/contact': (req, res) => serveHTML('contact.html', res),
    },
    POST: {
        '/contact': (req, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'received',
                data: req.body
            }));
        }
    }
};
