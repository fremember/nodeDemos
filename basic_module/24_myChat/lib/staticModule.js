/**
 * 定义全局常用变量
 */

let sys = require('util'),
	fs = require('fs'),
	path = require('path'),
	BASE_DIR = __dirname,
	STATIC = BASE_DIR + '/static',
	CACHE_TIME = 60 * 60 * 24 * 365,// 缓存时间
	mmieConf = getMmieConf();

/**
 *
 * 响应静态资源请求
 * @param string pathname
 * @param object res
 * @return null
 */

exports.getStaticFile = (pathname, req, res, staticPath) => {
	let extname = path.extname(pathname)
	extname = extname ? extname.slice(1) : ''
	let realPath = `${staticPath}${pathname}`,
		mmieType = mmieConf[extname] ? mmieConf[extname] : 'text/plain';
	fs.exists(realPath, (exists) => {
		if(!exists) {
			res.writeHead(404, { 'Content-Type': 'text/plain' })
			res.write(`This request URL ${pathname} was not found on this server.`)
			res.end()
		} else {
			let fileInfo = fs.statSync(realPath),
				lastModified = fileInfo.mtime.toUTCString();
			/* 设置缓存 */
			if(mmieConf[extname]) {
				let date = new Date()
				date.setTime(date.getTime() + CACHE_TIME * 1000)
				res.setHeader('Expires', date.toUTCString())
				res.setHeader('Cache-Control', `max-age=${CACHE_TIME}`)
			}
			if(req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']) {
				res.writeHead(304, 'Noe Modified')
				res.end()
			} else {
				fs.readFile(realPath, 'binary', (err, file) => {
					if(err) {
						res.writeHead(500, { 'Content-Type': 'text/plain' })
						res.end()
					} else {
						res.setHeader('Last-Modified', lastModified)
						res.writeHead(200, { 'Content-Type': mmieType })
						res.write(file, 'binary')
						res.end()
					}
				})
			}
		}
	})
}

// 获取MMIE配置信息，读取配置文件
function getMmieConf () {
	let routerMsg = {}
	try {
		let str = fs.readFileSync(`${CONF}mmie_type.json`, 'utf8')
		routerMsg = JSON.parse(str)
	} catch (e) {
		sys.debug('JSON parse fails')
	}
	return routerMsg
}





