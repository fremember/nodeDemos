let _req, _res,
	fs = require('fs'),
	url = require('url');
exports.init = (req, res) => {
	_req = req
	_res = res
}
exports.imgJpg = () => {
	let readPath = `${__dirname}/${url.parse('img.jpg').pathname}`,
		indexPage = fs.readFileSync(readPath);
	_res.writeHead(200, { 'Content-Type': 'image/jpg' })
	_res.end(indexPage)
}