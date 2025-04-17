// lib/middleware/auth/auth.js

const { token: SECRET_TOKEN } = require('../../../config/secret');

function auth(req, res, next) {
  const authorizationHeader = req.headers['authorization'];

  // Check if the authorization header is valid
  const isAuthorized = authorizationHeader === `Bearer ${SECRET_TOKEN}`;

  if (!isAuthorized) {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized');
    return;
  }

  // If authorized, proceed to the next middleware
  next();
}

module.exports = auth;
