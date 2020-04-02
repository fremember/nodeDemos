let crypto = require('crypto')
module.exports = function () {
    this.encode = function () {
        var algorithm = arguments[0] ? arguments[0] : null,
            enstring = arguments[1] ? arguments[1] : '',
            returnType = arguments[2] ? arguments[2] : '',
            encodeKey = arguments[3] ? arguments[3] : '',
            hmac = crypto.createHmac(algorithm, encodeKey);
        hmac.update(enstring)
        return hmac.digest(returnType)
    }
    this.decode = function () {
        console.log('it has not decode function')
    }
}