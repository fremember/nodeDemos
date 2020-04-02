let http = require('http'),
	url = require('url'),
	router = require('./router.js');// 加载文件模块

http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
	req.setEncoding('utf8')
	res.writeHead(200, { 'Content-Type': 'text/html' })
	router.router(req, res, pathname)
}).listen(3000, '127.0.0.1')

console.log('this server running at http://127.0.0.1:3000')
