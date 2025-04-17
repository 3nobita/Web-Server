// lib/middleware/auth/builtInAuth.js

function builtInAuth(secretToken) {
    return function (req, res, next) {
      const token = req.headers['authorization'];
      const isAuthorized = token === `Bearer ${secretToken}`;
  
      if (!isAuthorized) {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Unauthorized');
        return;
      }
  
      next(); // allowed
    };
  }
  
  module.exports = builtInAuth;
  