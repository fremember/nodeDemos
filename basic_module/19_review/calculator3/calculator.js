let _req, _res,
	fs = require('fs'),
	url = require('url'),
	querystring = require('querystring'),
	httpParam = require('./httpParam');
exports.init = (req, res) => {
	_req = req
	_res = res
}
exports.index = () => {
	let readPath = `${__dirname}/${url.parse(_res.url).pathname}`,
		indexPage = fs.readFileSync(readPath);
	_res.writeHead(200, { 'Content-Type': 'text/html' })
	_res.end(indexPage)
}
exports.calculate = () => {
	httpParam.init(_req, _res)
	httpParam.POST('', (param) => {
		let type = param['type'] ? parseInt(param['type']) : 0,
			preValue = param['pre'] ? parseFloat(param['pre']) : 0,
			nextValue = param['next'] ? parseFloat(param['next']) : 0;
		switch(type) {
			case 1:
				ret = preValue + nextValue
				break
			case 2:
				ret = preValue - nextValue
				break
			case 3:
				ret = preValue * nextValue
				break
			case 4:
				ret = preValue / nextValue
				break
		}
		ret = '' + ret
		_res.writeHead(200, { 'Content-Type': 'text/plain' })
		_res.end(ret)
	})
}