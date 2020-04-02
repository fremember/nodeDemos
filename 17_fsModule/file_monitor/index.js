let http = require('http'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring'),
	jade = require('jade'),
	socket = require('socket.io'),
	httpParam = require('./httpParam'),
	staticModule = require('./staticModule'),
	BASE_DIR = __dirname,
	filePath = BASE_DIR + '/test.txt';

let app = http.createServer((req, res) => {
	res.render = (template, options) => {
		let str = fs.readFileSync(template, 'utf8'),
			fn = jade.compile(str, { filename: template, pretty: true }),
			page = fn(options);
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end(page)
	}

	let pathname = decodeURI(url.parse(req.url).pathname)
	httpParam.init(req, res)
	if(pathname == '/favicon.ico') {
		return
	}
	// 路由处理
	switch (pathname) {
		case '/':
		case '/index':
			defaultIndex(res)
			break
		default:
			staticModule.getStaticFile(pathname, req, res)
			break
	}
}).listen(3000),
	io = socket.listen(app);

io.sockets.on('connection', (socket) => {
	let message = fs.readFileSync(filePath, 'utf8')
	socket.emit('change_from_server', { msg: message })
	socket.on('success', (data) => {
		console.log(data.message)
	})
	socket.on('data', (data) => {
		writeFile(data.msg, () => {
			socket.emit('change_from_server', { msg: data.msg })
		})
	})
})

function defaultIndex (res) {
	res.render('index.jade', { user: 'pxy' })
}

function writeFile (msg, cb) {
	fs.writeFile(filePath, msg, (err) => {
		if(err) throw err
		cb()
	})
}

