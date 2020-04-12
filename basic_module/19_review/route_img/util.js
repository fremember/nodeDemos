/**
 * 使用try catch来处理路由
 * 避免某些模块不存在是的报错情况
 */
let _req, _res,
	fs = require('fs'),
	url = require('url');
exports.init = (req, res) => {
	_req = req
	_res = res
}
exports.index = () => {
	let pathname = __dirname + '/' + url.parse(_req.url).pathname,
		indexPage = fs.readFileSync(pathname);
	_res.writeHead(200, { 'Content-Type': 'text/html' })
	_res.end(indexPage)
}