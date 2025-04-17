//middlewareRunner.js

function applyMiddlewares(req, res, middlewares, finalhandler) {
    let index = 0
    function next() {
        if (index < middlewares.length) {
            const current = middlewares[index];
            index++
            current(req, res, next)
        }
        else {
            finalhandler(req, res)
        }
    }
    next()
}
module.exports = applyMiddlewares