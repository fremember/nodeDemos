let res, req,
	fs = require('fs'),
	url = require('url');
/* 创建初始变量函数 */
exports.init = function (request, response) {
	res = response
	req = request
}
/* 创建index首页函数 */
exports.index = function () {

	let readPath = __dirname + '/' + url.parse('index.html').pathname,// 获取需要返回的文件路径
		indexPage = fs.readFileSync(readPath);// 同步读取文件信息
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.end(indexPage)
}