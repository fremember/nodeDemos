let util = require('util'),
    Target = require('./target');

function Adapter () {
    Target.call(this)
    /**
     * 参数说明
     * encodeModule  模块名，例如使用hash加密时，该参数就是'hash'字符串
     * algorithm  算法类型，例如'sha1', 'md5', 'sha256', 'sha512'等
     * enstring  需要加密的字符串或者字符的二进制数据流
     * returnType  输出返回类型，例如'hex', 十六进制返回输出
     * encodeKey  加密使用的私钥，为可选参数
     * encodeType  加密时需要的加密编码，可以为'binary', 'ascaii' 或者'utf8'
    */
    this.encode = function () {
        let encodeModule = arguments[0] ? arguments[0] : null,
            algorithm = arguments[1] ? arguments[1] : null,
            enstring = arguments[2] ? arguments[2] : '',
            returnType = arguments[3] ? arguments[3] : '',
            encodeKey = arguments[4] ? arguments[4] : '',
            encodeType = arguments[5] ? arguments[5] : '',
            AdapteeClass = require('./adaptee_class/' + encodeModule),
            adapteeObj = new AdapteeClass();
        return adapteeObj.encode(algorithm, enstring, returnType, encodeKey, encodeType)
    }
    this.encode = function () {
        let encodeModule = arguments[0] ? arguments[0] : null,
            algorithm = arguments[1] ? arguments[1] : null,
            enstring = arguments[2] ? arguments[2] : '',
            returnType = arguments[3] ? arguments[3] : '',
            encodeKey = arguments[4] ? arguments[4] : '',
            encodeType = arguments[5] ? arguments[5] : '',
            AdapteeClass = require('./adaptee_class/' + encodeModule),
            adapteeObj = new AdapteeClass();
        return adapteeObj.decode(algorithm, enstring, returnType, encodeKey, encodeType)
    }
}

util.inherits(Adapter, Target)
module.exports = Adapter