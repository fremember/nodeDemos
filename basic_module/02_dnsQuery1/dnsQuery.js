let http = require('http'),// 负责http服务器的创建
	fs = require('fs'),// 文件操作
	url = require('url'),// 处理url路径
	dns = require('dns'),// dns查询
	querystring = require('querystring');// 字符串处理

// 正确显示dnsQuery.html内容
/*http.createServer((req, res) => {
	res.writeHead(200, { 'content-type': 'text/html' })
	let path = __dirname + '/' + url.parse('dnsQuery.html').pathname
	let indexHtml = fs.readFileSync(path)
	res.end(indexHtml)
}).listen(3000, '127.0.0.1')*/

// 重新构造服务器添加路由
http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
	req.setEncoding('utf8')
	res.writeHead(200, { 'content-type': 'text/html' })
	router(req, res, pathname)
}).listen(3000, '127.0.0.1')

function router (req, res, pathname) {
	switch (pathname) {
		case '/parse':
			parseDns(req, res)
			break
		default:
			goIndex(req, res)
	}
}

function goIndex (req, res) {
	let readPath = __dirname + '/' + url.parse('dnsQuery.html').pathname,// 获取dnsQuery.html的文件路径
		indexHtml = fs.readFileSync(readPath);// 同步读取dnsQuery.html文件信息
	res.end(indexHtml)// 返回数据
}
// 解析客户端传递来的域名，并且返回该域名相应的IP地址
function parseDns (req, res) {
	let postData = ''
	req.addListener('data', (postDataChunk) => {// 组合post请求发来的数据
		postData += postDataChunk
	})
	req.addListener('end', () => {
		let retData = getDns(postData, (domain, addresses) => {// domain是域名参数，addresses是解析后返回的IP地址列表
			res.writeHead(200, { 'content-type': 'text/html' })
			res.end(`<html>
				<head>
					<meta http-equiv="content-type" content="text/html; charset=utf-8">
					<style>
						.container {
							margin: 0 auto;
						}
						.container p {
							line-height: 30px;
						}
						.container p span {
							color: #f00;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<p>Domain: <span>${domain}</span></p>
						<p>IP: <span>${addresses.join(',')}</span></p>
					</div>
				</body>
				</html>`)
		})
		return
	})
}
// 异步解析域名
function getDns (postData, cb) {
	let domain = querystring.parse(postData).search_dns
	dns.resolve(domain, (err, addresses) => {
		if(!addresses) {
			addresses = ['不存在域名']
		}
		cb(domain, addresses)
	})
}


// 打印运行log
console.log('server running at http://127.0.0.1:3000/')