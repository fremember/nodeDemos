/**
 * 设置全局路径
 */
global.BASE_DIR = __dirname
global.APP = `${BASE_DIR}/app/`
global.CON = `${APP}controller/`
global.CORE = `${APP}core/`
global.LIB = `${BASE_DIR}/lib/`
global.CONF = `${BASE_DIR}/conf/`
global.STATIC = `${BASE_DIR}/static/`
global.VIEW = `${BASE_DIR}/view/`

/**
 * modules 引入
 */

global.lib = {
    http: require('http'),
    fs: require('fs'),
    url: require('url'),
    querystring: require('querystring'),
    httpParam: require(`${LIB}httpParam`),
    staticModule: require(`${LIB}staticModule`),
    router: require(`${CORE}router`),
    action: require(`${CORE}action`),
    jade: require('jade'),
    socket: require('socket.io'),
    path: require('path'),
    parseCookie: require(`${LIB}parseCookie`),
    session: require(`${LIB}nodeSession`),
    util: require('util'),
    config: require(`${CORE}comm/util`)
}

global.onlineList = {}

global.app = lib.http.createServer((req, res) => {
    res.render = function() {
        let template = arguments[0],
            options = arguments[1],
            str = lib.fs.readFileSync(template, 'utf8'),
            fn = lib.jade.compile(str, { filename: template, pretty: true }),
            page = fn(options);
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(page)
    }
    lib.router.router(req, res)
}).listen(3000)

console.log('this server running at http://127.0.0.1:3000')

global.io = lib.socket.listen(app)