let http = require('http'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring');

http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
	switch (pathname) {
		case '/add':
			resAdd(req, res)
			break
		default:
			resdefault(res)
			break
	}
}).listen(3000, '127.0.0.1')

function resdefault(res) {// 读取首页信息，并返回
	let readFile = __dirname + '/' + url.parse('index.html').pathname,
		dataIndex = fs.readFileSync(readFile);
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(dataIndex)
}

function resAdd(req, res) {
	let postData = ''
	req.addListener('data', (postDataChunk) => {
		postData += postDataChunk
	})
	req.addListener('end', () => {
		// post数据接收到后的处理逻辑
		let postDataJson = querystring.parse(postData)
		/* 解决中文乱码：方式1 */
		res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
		res.end(`您输入的姓名是${postDataJson.name}, 密码是${postDataJson.pwd}`)
		/* 解决中文乱码：方式2 */
		/*res.writeHead(200, {'Content-Type': 'text/html'})
		res.write('<head><meta charset="utf-8"/></head>')
		res.write('<h1>彭向阳</h1>')
		res.end('在写代码')*/
	})
}

console.log('the server running at http://127.0.0.1:3000')