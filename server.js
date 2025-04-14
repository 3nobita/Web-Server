//server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 1000;

// const server = http.createServer((req, res) => {
//     console.log(`income request:  ${req.method},${req.url}`)  // Just for debugging — helps you see what the browser or client is doing.
//     let filePath = '';

//     //landing route
//     if (req.url === '/') {
//         // res.writeHead(200, { 'Content-Type': 'text/html' })
//         // res.end('<h1> home page is working </h1>') 
//         filePath = path.join(__dirname, 'public', 'index.html')
//     }
//     else if (req.url === '/about') {
//         filePath = path.join(__dirname, 'public', 'about.html')
//     }
//     else if (req.url === '/api') {
//         res.writeHead(200, { 'Content-Type': 'application/json' })
//         res.end(JSON.stringify({ message: 'api is working' }))
//     }
//     else {
//         res.writeHead(400, { 'Content-Type': 'text/plain' });
//         res.end('404 - not found')
//         return;
//     }

//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//             res.writeHead(500, { 'content-type': 'text/plain' });
//             res.end('server error')
//         } else {
//             res.writeHead(200, { 'content-type': 'text/html' });
//             res.end(content)
//         }
//     })





// })

const server = http.createServer((req, res) => {
    const { url, method } = req
    console.log(`INCOMING URL:${req.method} ${url} `);
    if (method === GET) {
        switch (url) {
            case '/':
                serveHTML('index.html', res);
                break;
            case '/about':
                serveHTML('about.html', res)
                break;
            case '/contact':
                serveHTML('contact.html', res)
                break;
            case '/api':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'API is working' }))
                break;
            default:
                //any unkown route
                res.writeHead(404, { 'content-type': 'text/plain' });
                res.end('404 Unknown request')
        }
    }
    else{
        // start from here 
    }
    //handle post
    if (url === '/contact' && method === POST) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString()
        });
        req.end('end', () => {
            try {
                const data = JSON.parse(body);
                console.log('recived data:', data);
                //respond to client back
                res.writeHead(200, { 'content:type': 'application/json' });
                res.end(JSON.stringify({
                    status: 'success',
                    message: 'thankx for reaching out',
                    received: data
                }))
            }
            catch (err) {
                res.writeHead(400, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ err: 'Invalid Json format ' }))
            }
        })
    }
    else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('404 =  Not Found')
    }
})

function serveHTML(fileNAME, res) {
    const filePath = path.join(__dirname, 'public', fileNAME);
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'content-type': 'text/plain' });
            res.end('Server error')
        }
        else {
            res.writeHead(200, { 'content-type': 'text/html' })
            res.end(content)
        }
    })
}

server.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
});
server.on('error', (err) => {
    console.error(`❌ Failed to start server: ${err.message}`);
}); 