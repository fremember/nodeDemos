let http = require('http'),
	fs = require('fs'),
	url = require('url'),
	staticModule = require('./staticModule'),
	BASE_DIR = __dirname;

http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
	if(pathname == '/favicon.ico') {
		return
	} else if(pathname == '/' || pathname == '/index') {
		goIndex(res)
	} else {
		staticModule.getStaticFile(pathname, req, res)
	}
}).listen(3000, '127.0.0.1')
console.log('this server running at http://127.0.0.1:3000')

function goIndex (res) {
	let readFile = BASE_DIR + '/' + url.parse('index.html').pathname,
		pageIndex = fs.readFileSync(readFile);
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(pageIndex)
}