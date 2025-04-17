//web-server/middleware/logger.js

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method}${req.url}`);
    next() // important: move to next middleware
}
module.exports = logger