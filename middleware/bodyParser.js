module.exports = (req, res, next) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                req.body = JSON.parse(body);
            } catch (e) {
                req.body = {};
            }
            next();
        });
    } else {
        next();
    }
};
