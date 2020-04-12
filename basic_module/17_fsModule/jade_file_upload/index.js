let http = require('http'),	
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring'),
	formidable = require('formidable'),
	jade = require('jade'),
	httpParam = require('./http_params'),
	staticModule = require('./staticModule'),
	BASE_DIR = __dirname;

http.createServer((req, res) => {
	res.render = function(template, options) {
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
	switch (pathname) {
		case '/upload':
			upload(req, res)
			break
		case '/image':
			showImage(req, res)
			break
		case '/':
		case '/index':
			defaultIndex(res)
			break
		case '/show':
			show(res)
			break
		default:
			staticModule.getStaticFile(pathname, req, res)
			break
	}
}).listen(3000, '127.0.0.1')
console.log('this server running at http://127.0.0.1:3000')

function defaultIndex(res) {
	res.render('index.jade', { user: 'frememebr' })
}

function upload (req, res) {
	let timestamp = Date.parse(new Date()),
		form = new formidable.IncomingForm();
	form.parse(req, (error, fields, files) => {
		let fileName = timestamp + '_' + files.image.name
		fs.renameSync(files.image.path, BASE_DIR + '/uploadFile/' + fileName)
		res.render('show_image.jade', { 'imgurl': '/uploadFile/' + fileName })
	})
}

function show (res) {
	let readPath = BASE_DIR + '/' + url.parse('show_image.html').pathname,
		indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(indexPage)
}

function showImage(req, res) {
	let retData = { 'retCode': 0, 'imageUrl': '/uploadFile/test.png' }
	res.writeHead(200, { 'Content-Type': 'text/plain' })
	res.end(JSON.stringify(retData))
}