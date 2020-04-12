let _req, _res,
	url = require('url'),
	querystring = require('querystring');

/* 初始化req, res */
exports.init = function(req, res) {
	_req = req
	_res = res
}

/* 获取GET参数方法 */
exports.GET = function (key) {
	let paramStr = url.parse(_req.url).query,
		param = querystring.parse(paramStr);
	return param[key] ? param[key] : ''
}

/* 获取POST参数方法 */
exports.POST = function (key, cb) {
	let postData = ''
	_req.addListener('data', (postDataChunk) => {
		postData += postDataChunk
	})
	_req.addListener('end', () => {
		let param = querystring.parse(postData),
			value = param[key] ? param[key] : '';
		cb(value)
	})
}