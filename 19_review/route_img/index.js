let http = require('http'),
	url = require('url'),
	querystring = require('querystring');
http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
	if(pathname == '/favicon.ico' || pathname == '/') {
		return
	}
	let pathArr = pathname.split('/')
	pathArr.shift()// 弹出第一个空格
	let model = pathArr.shift(),
		controller = pathArr.shift(),
		classObj;
	if(!model || !controller) {
		noSource(res)
	} else {
		try {
			classObj = require(`./${model}`)
		} catch (err) {
			console.log(`chdir: ${err}`)
		}
		if(classObj) {
			classObj.init(req, res)
			try {
				classObj[controller].call()
			} catch (err) {
				noSource(res)
			}
		} else {
			noSource(res)
		}
	}
}).listen(3000, '127.0.0.1')
console.log('this server running at http://127.0.0.1:3000')

function noSource (res) {
	res.writeHead(404, { 'Content-Type': 'text/plain' })
	res.end('can not find source')
}