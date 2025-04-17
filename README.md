# 🚀 39-Server (Web Framework)

A lightweight, minimal Node.js web server framework that gives you full control — with built-in middleware support, custom routing, HTML serving, and now advanced token-based authentication without writing any extra code.

---

## 📦 Installation

```bash
npm install @3nobita/39server


🚀 Usage
const createServer = require('@3nobita/39server');
const logger = require('./lib/middleware/logger');
const bodyParser = require('./lib/middleware/bodyParser');

// Define routes
const routes = {
  GET: {
    '/': (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Welcome to 39-server!');
    },
    '/profile': (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('This is a protected profile route.');
    }
  }
};

// Create server with options
createServer({
  port: 3000,
  routes,
  middlewares: [logger, bodyParser],
  authToken: 'your-secret-token', // 🔐 Built-in auth
  publicRoutes: ['/', '/about']   // 👥 No auth required here
});
🔐 Built-in Auth Middleware
No need to write your own auth logic!

Just pass authToken and publicRoutes:

js
Copy
Edit
createServer({
  authToken: 'my-secret-token',
  publicRoutes: ['/', '/login'],
});
All routes not in publicRoutes will automatically require Authorization: Bearer my-secret-token header.

If not provided or incorrect → 401 Unauthorized response.

⚙️ Features
🧱 Custom middleware support

🚦 Route handling by method (GET, POST, etc.)

🔐 Optional built-in auth with authToken

👥 Public route control with publicRoutes

📄 Static HTML page serving

🪝 Simple middleware runner system

🧩 Middleware Example
Write your own middleware and plug it in:

function logger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
}
Then add to middlewares array.

📄 Serve Custom 404 HTML
If no route matches, 404page.html from your root is served:


/public/404page.html
🤝 Contribute
Pull requests welcome. If you want to build your own middleware or plugin, let’s grow this baby! 💥

📜 License
MIT © 3nobita