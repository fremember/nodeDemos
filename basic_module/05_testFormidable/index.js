let http = require('http'),
	util = require('util'),
	formidable = require('formidable');

http.createServer((req, res) => {
	if(req.url == '/upload' && req.method.toLowerCase() == 'post') {
		let form = formidable.IncomingForm()
		form.parse(req, (err, fields, files) => {
			res.writeHead(200, { 'Content-Type': 'text/plain' })
			res.write('received update:\n\n')
			res.end(util.inspect({ fields: fields, files: fields }))
		})
		return
	} else {
		res.writeHead(200, { 'Content-Type': 'text/html' })
		res.end(`
			<form action="/upload" enctype="multipart/form-data" method="post">
				<input type="text" name="title"><br />
				<input type="file" name="upload" multiple="multiple"><br />
				<input type="submit" value="upload">
			</form>
		`)
	}
}).listen(3000, '127.0.0.1')
console.log('this server running at http://127.0.0.1:3000')