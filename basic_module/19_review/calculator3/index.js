let http = require('http'),
	url = require('url'),
	fs = require('fs');
http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
	if(pathname == '/favicon.ico') {
		return
	} else if(pathname == '/' || pathname == '/index') {// 显示首页
		goIndex(res)
	} else {
		let classObj = null
		try {
			classObj = require('./calculator')
		} catch (err) {
			console.log(`chdir: ${err}`)
		}
		if(classObj) {
			classObj.init(req, res)
			try {
				classObj['calculate'].call()
			} catch (err) {
				noSource(res)
			}
		} else {
			noSource(res)
		}
	}
}).listen(3000, '127.0.0.1')
console.log('this server running at http://127.0.0.1:3000')

function goIndex (res) {
	let readPath = `${__dirname}/${url.parse('index.html').pathname}`,
		indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(indexPage)
}
function noSource (res) {
	res.writeHead(404, { 'Content-Type': 'text/plain' })
	res.end('can not find source')
}