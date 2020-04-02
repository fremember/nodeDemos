let parseDns = require('./parse_dns.js'),
	mainIndex = require('./main_index.js');

/* 创建router方法，并向外暴露给外部接口 */
exports.router = (req, res, pathname) => {
	switch (pathname) {// 根据pathname来路由调用处理逻辑
		case '/parse':
			parseDns.parseDns(req, res)// 执行dns解析
			break
		default:
			mainIndex.goIndex(req, res)// 响应html到客户端
	}
}