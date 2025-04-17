//web-server/middleware/logger.js

function logger(req, res, next) {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next() // important: move to next middleware
}
module.exports = logger