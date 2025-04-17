// middlewares/auth/auth.js

const { token: SECRET_TOKEN } = require('../../../config/secret');


function auth(req,res,next){
 const isAuthorized  = req.header.authorization  === 'Bearar secret_token';

 if (!isAuthorized) {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized');
    return;
}

// If authorized
next();
 



}

module.export = auth