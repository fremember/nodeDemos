let http = require('http'),
	url = require('url'),
	fs = require('fs'),
	BASE_DIR = __dirname;

http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname,
		realPath = BASE_DIR + '/static' + pathname;
	if(pathname == '/favicon.ico') {
		return
	} else if(pathname == '/' || pathname == '/index') {
		goIndex(res)
	} else {
		dealWithStatic(pathname, realPath, res)
	}
}).listen(3000, '127.0.0.1')
console.log('the server running at http://127.0.0.1:3000')

function goIndex (res) {
	let readFile = BASE_DIR + '/' + url.parse('index.html').pathname,
		pageIndex = fs.readFileSync(readFile);
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
	res.end(pageIndex)
}
function dealWithStatic (pathname, realPath, res) {
	fs.exists(realPath, (exists) => {// 判断文件是否存在
		if(!exists) {
			res.writeHead(200, { 'Content-Type': 'text/plain' })
			res.write(`This request URL: ${pathname} was not found on the server.`)
			res.end()
		} else {
			let pointPosition = pathname.lastIndexOf('.'),
				mmieString = pathname.substring(pointPosition + 1),
				mmieType;
			switch(mmieString) {
				case 'css':
					mmieType = 'text/css'
					break
				case 'png':
					mmieType = 'image/png'
					break
				default:
					mmieType = 'text/plain'
					break
			}
			fs.readFile(realPath, "binary", (err, file) => {
				if(err) {
					res.writeHead(200, { 'Content-Type': 'text/plain' })
					res.end(err)
				} else {
					res.writeHead(200, { 'Content-Type': mmieType })
					res.write(file)
					res.end()
				}
			})
		}
	})
}