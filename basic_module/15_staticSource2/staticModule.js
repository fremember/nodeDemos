/**
 * 引入变量和配置项
 */
let sys = require('util'),
	fs = require('fs'),
	path  = require('path'),
	BASE_DIR = __dirname,
	CONF = BASE_DIR + '/conf/',
	STATIC = BASE_DIR + '/static',
	mmieConf = getMmieConf();
/**
 *
 * 响应静态资源请求
 * @param string pathname
 * @param object res
 * @return null
 */
exports.getStaticFile = function (pathname, res) {
	let extname = path.extname(pathname)// 文件的扩展名
	extname  = extname  ? extname.slice(1) : ''// 文件的类型
	let realPath = STATIC + pathname,
		mmieType = mmieConf[extname] ? mmieConf[extname] : 'text/plain';
	fs.exists(realPath, (exists) => {
		if(!exists) {
			res.writeHead(200, { 'Content-Type': 'text/plain' })
			res.write(`This server URL ${pathname} was not found on this server.`)
			res.end()
		} else {
			fs.readFile(realPath, 'binary', (err, file) => {
				if(err) {
					res.writeHead(200, { 'Content-Type': 'text/plain' })
					res.end(err)
				} else {
					res.writeHead(200, { 'Content-Type': mmieType })
					res.write(file, 'binary')
					res.end()
				}
			})
		}
	})

}
// 获取MMIE配置信息，读取配置文件
function getMmieConf () {
	let routerMsg = {}
	try {
		let str = fs.readFileSync(CONF + 'mmie_type.json', 'utf8')
		routerMsg = JSON.parse(str)
	} catch(e) {
		sys.debug('JSON parse fails')
	}
	return routerMsg
}