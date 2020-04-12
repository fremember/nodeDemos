/* 处理首页逻辑信息 */
let fs = require('fs'),
	url = require('url');

/* 定义goIndex跳转首页函数 */
exports.goIndex = (req, res) => {
	let readpath = __dirname + '/' + url.parse('index.html').pathname,
		indexPage = fs.readFileSync(readpath);
	res.end(indexPage)
}