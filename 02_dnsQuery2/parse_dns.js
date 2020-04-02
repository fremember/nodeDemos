let dns = require('dns'),
	querystring = require('querystring');

function _getDns (postData, cb) {
	let domain = querystring.parse(postData).search_dns
	/* 异步解析域名 */
	dns.resolve(domain, (err, addresses) => {
		if(!addresses) {
			addresses = ['不存在域名']
		}
		cb(domain, addresses)
	})
}
exports.parseDns = (req, res) => {
	let                    = ''
	req.addListener('data', (postDataChunk) => {
		postData += postDataChunk
	})
	req.addListener('end', () => {
		let retData = _getDns(postData, (domain, addresses) => {
			res.writeHead(200, { 'Content-Type': 'text/html' })
			res.end(`
				<!document>
				<html>
					<head>
						<meta http-equiv='content-type' content-type='text/html charset=utf-8'>
					</head>
					<body>
						<div style="text-align: center;">
							<p style="color: #f00;">domain: ${domain}</p>
							<p style="margin-top: 20px; color: #0f0;">addresses: ${addresses.join(',')}</p>
						</div>
					</body>
				</html>
			`)
		})
		return
	})
}