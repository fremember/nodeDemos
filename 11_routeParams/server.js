let http = require('http'),
	url = require('url'),
	querystring = require('querystring');

/**
 * 创建web服务器
 * 测试用例：
 * 	index: http://127.0.0.1:3000/index?c=index
 * 	image: http://127.0.0.1:3000/image?c=image
 */

http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
	if(pathname == '/favicon.ico') {// 过滤浏览器默认请求/favicon.ico
		return
	}
	/* 根据用户请求的url路径，截取其中的module和controller	 */
	let module = pathname.substr(1),
		str = url.parse(req.url).query,
		controller = querystring.parse(str).c,
		classObj = '';
	/* 应用try catch来require一个模块，并捕获异常 */
	try {
		classObj = require('./' + module)
	} catch(err) {/* 异常错误时，打印错误信息 */
		console.log('chair: ' + err)
	}
	if(classObj) {
		classObj.init(req, res)// 初始化模块参数req和res
		classObj[controller].call()// require成功时，则应用call方法，实现类中的方法调用执行
	} else {// 调用不存在的模块时，则默认返回404错误信息
		res.writeHead(200, { 'Content-Type': 'text/plain' })
		res.end('can not find source')
	}
}).listen(3000, '127.0.0.1')

console.log('this server running at http://127.0.0.1:3000')