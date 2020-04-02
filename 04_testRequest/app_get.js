let http = require('http')
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'textplain' })
	res.end('Hello world ' + req.method)
}).listen(3000, '127.0.0.1')
console.log('this server is running at 127.0.0.1:3000')