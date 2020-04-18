let FAVICON = '/favicon.ico'
exports.router = (req, res) => {
    let logInfo = {},
        // url解码，避免url路径出现中文字符
        pathname = decodeURI(lib.url.parse(req.url).pathname);
    lib.httpParam.init(req, res)// 初始化http参数获取模块
    global.sessionLib = lib.session.start(req, res)// 初始化session管理模块
    let pathArr = pathname.split('/')// 获取http请求路径，使用斜杠获取请求的controller类名以及action方法
    pathArr.shift()// 弹出第一个空字符
    let model = pathArr.shift(),
        controller = pathArr.shift(),
        Class = '';
    // 添加日志信息
    logInfo['pathname'] = pathname
    logInfo['model'] = model
    logInfo['controller'] = controller
    if(pathname == FAVICON) {
        return
    } else if(pathname == '/') {
        res.render(`${VIEW}index.jade`)
        return
    }
    if(!controller || !model) {
        returnDefault(res, 'can not find source')
        return
    }
    // 尝试require一个controller类名，如果失败则认为是一个静态资源文件请求
    try {
        Class = require(`${CON}${model}`)
    } catch (err) {
        lib.staticModule.getStaticFile(pathname, req, res, BASE_DIR)
        return
    }
    if(Class) {
        let object = new Class(req, res)
        try {
            object[controller].call()
        } catch (err) {
            returnDefault(res, 'no this action')
        }
    } else {
        returnDefault(res, 'can not find source')
    }
}

/**
 * 默认404失败页面
 */
function returnDefault (res, string) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end(string)
}