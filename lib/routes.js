module.exports = {
    GET: {
      '/': (req, res) => res.end('Home Page'),
      '/about': (req, res) => res.end('About Page'),
    },
    POST: {
      '/data': (req, res) => res.end(`Received: ${req.body}`),
    },
  };
  