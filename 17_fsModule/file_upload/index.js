let http = require('http'),
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring'),
	httpParam = require('./httpParam'),
	staticModule = require('./staticModule'),
	formidable = require('formidable'),
	BASE_DIR = __dirname;

http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
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

/* 显示首页内容 */
function defaultIndex (res) {
	let readPath = BASE_DIR + '/' + url.parse('index.html').pathname,
		indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(indexPage)
}
/* 上传文件逻辑 */
function upload (req, res) {
	let readPath = BASE_DIR + '/' + url.parse('show_image.html').pathname,
		indexPage = fs.readFileSync(readPath),
		form = new formidable.IncomingForm();
	form.parse(req, (error, fields, files) => {
		fs.renameSync(files.image.path, BASE_DIR + '/uploadFile/test.png')
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end(indexPage)
	})
}
/* 显示逻辑 */
function show (res) {
	let readPath = BASE_DIR + '/' + url.parse('show_image.html').pathname,
		indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(indexPage)
}
/* 图片显示逻辑 */
function showImage (req, res) {
	let retData = { 'retCode': 0, 'imageUrl': '/uploadFile/test.png' }
	res.writeHead(200, { 'Content-Type': 'text/plain' })
	res.end(JSON.stringify(retData))
}