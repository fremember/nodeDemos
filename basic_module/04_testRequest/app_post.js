let http = require('http'),
	querystring = require('querystring');

http.createServer((req, res) => {
	let postData = ''
	req.addListener('data', (postDataChunk) => {
		postData += postDataChunk
	})

	req.addListener('end', () => {
		let postStr = JSON.stringify(querystring.parse(postData))
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.end(postStr + '\n' + req.method)
	})
}).listen(3000, '127.0.0.1')

console.log('Server running at http://127.0.0.1:3000/')