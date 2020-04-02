let sys = require('util'),
	fs = require('fs'),
	path = require('path'),
	BASE_DIR = __dirname,
	CONF = `${BASE_DIR}/conf/`,
	STATIC = `${BASE_DIR}/static`,
	UPLOADFILE =  `${BASE_DIR}/uploadFile`,
	CACHE_TIME = 60 * 60 * 24 * 365,
	mmieConf = getMmieConf();

exports.getStaticFile = function(pathname, req, res) {
	let extname = path.extname(pathname),
		realPath = ''
	extname = extname ? extname.slice(1) : ''
	if(pathname.indexOf('uploadFile') >= 0) {
		pathname = pathname.replace('uploadFile', '')
		realPath = `${UPLOADFILE}` + `${pathname}`
	} else {
		realPath = `${STATIC}` + `${pathname}`
	}
	let mmieType = mmieConf[extname] ? mmieConf[extname] : 'text/plain';
	fs.exists(realPath, (exists) => {
		if(!exists) {
			res.writeHead(200, { 'Content-Type': 'text/plain' })
			res.write(`This request UTL ${pathname} was not found on this server`)
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
			if(req.headers['if-modified-since'] && req.headers['if-modified-since'] == lastModified) {
				res.writeHead(304, "Not Modified");
				res.end();
			} else {
				fs.readFile(realPath, 'binary', (err, file) => {
					if(err) {
						res.writeHead(200, { 'Content-Type': 'text/plain' })
						res.end(err)
					} else {
						res.setHeader('Last-Modified', lastModified)
						res.writeHeader(200, { 'Content-Type': mmieType })
						res.write(file, 'binary')
						res.end()
					}
				})
			}
		}
	})
}

function getMmieConf () {
	let routerMsg = {}
	try {
		let str = fs.readFileSync(`${CONF}mmie_type.json`, 'utf8')
		routerMsg = JSON.parse(str)
	} catch(e) {
		sys.debug('JSON parse fails')
	}
	return routerMsg
}