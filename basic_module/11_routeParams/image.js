let req, res,
	fs = require('fs'),
	url = require('url');

exports.init = function (request, response) {
	req = request
	res = response
}

exports.image = function () {
	let readPath = __dirname + '/' + url.parse('logo.png').pathname,
		indexPage = fs.readFileSync(readPath);
	res.writeHead(200, { 'Content-Type': 'image/png' })
	res.end(indexPage)
}