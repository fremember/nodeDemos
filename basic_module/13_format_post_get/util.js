let _req, _res,
	url = require('url'),
	querystring = require('querystring');

exports.init = function(res, res) {
	_req = req
	_res = res
}

exports.GET = function(key) {
	let params = url.parse(_req.url).query,
		param = querystring.parse(params);
	return param[key] ? param[key] : ''
}

exports.POST = function(key, cb) {
	let postData = ''
	_req.addListener('data', (postDataChunk) => {
		postData += postDataChunk
	})
	_req.addListener('end', () => {
		let params = querystring.parse(postData),
			value = params[key] ? params[key] : '';
		cb(value)
	})
}