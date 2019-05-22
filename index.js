let http = require('http');
http.createServer((req, res) => {
    console.log('req:', req.url);
    res.writeHead(200);
    res.end();
}).listen(3000);
