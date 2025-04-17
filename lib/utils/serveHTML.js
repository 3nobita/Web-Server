const fs = require('fs');
const path = require('path');

module.exports = function serveHTML(fileName, res) {
    const filePath = path.join(__dirname, '../public', fileName);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
};
