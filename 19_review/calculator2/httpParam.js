let _req, _res,
	url = require('url'),
	querystring = require('querystring');

/**
 * 初始化_req和_req参数
 */
exports.init = (req, res) => {
	_req = req
	_res = res
}

/**
 * 获取GET参数方法
 */
exports.GET = (key) => {
	let paramStr = url.parse(url.query),
		param = querystring.parse(paramStr);
	return param[key] ? param[key] : ''
}

/**
 * 获取POST参数方法
 */
exports.POST = (key, cb) => {
	let postData = ''
	_req.addListener('data', (postDataChunk) => {
		postData += postDataChunk
	})
	_req.addListener('end', () => {
		// 数据接收完毕，执行回调函数
		let param = querystring.parse(postData),
			value;
		if(key) {
			value = param[key] ? param[key] : ''
			cb(value)
		} else {
			cb(param)
		}
		
	})
}