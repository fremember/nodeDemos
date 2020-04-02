let _res,_req,
	url = require('url'),
	querystring = require('querystring');
/**
 * 初始化res和req参量
 */
exports.init = function(req, res){
	_res = res;
	_req = req;
}

/**
 * 获取GET参数方法
 */
exports.GET = function(key){
	let paramStr = url.parse(_req.url).query,
		param = querystring.parse(paramStr);
	return param[key] ? param[key]  : ''
}

/**
 * 获取POST参数方法
 */
exports.POST = function(key, cb){
	let postData = ''
	_req.addListener('data', (postDataChunk) => {
		postData += postDataChunk
	})
	_req.addListener('end', () => {
		// 数据接收完毕，执行回调函数
		let param = querystring.parse(postData),
			value = param[key] ? param[key]  : '';
		cb(value)
	})
}