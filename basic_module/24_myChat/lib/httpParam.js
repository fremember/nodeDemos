let _req, _res,
    url = require('url'),
    querystring = require('querystring');
/**
 * 初始化req和res参数
 */
exports.init = (req, res) => {
    _req = req
    _res = res
}

/**
 * 获取GET参数
 */
exports.GET = (key) => {
    let paramStr = url.parse(req.url).query,
        param = querystring.parse(paramStr);
    return param[key] ? param[key] : ''
}

/**
 * 获取POST参数方法
 */
exports.POST = (key, callback) => {
    let postData = '';
    _req.on('data', (postDataChunk) => {
        postData += postDataChunk
    })
    _req.on('end', () => {
        let param = querystring.parse(postData)
        if(key != '') {
            callback(param[key] ? param[key] : '')
            return
        }
    })
}