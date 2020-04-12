let crypto = require('crypto')
module.exports = function () {
    this.encode = function () {
        let algorithm = arguments[0] ? arguments[0] : null,
            enstring = arguments[1] ? arguments[1] : '',
            returnType = arguments[2] ? arguments[2] : '',
            encodeKey = arguments[3] ? arguments[3] : '',
            encodeType = arguments[4] ? arguments[4] : '',
            cipher = crypto.createCipher(algorithm, encodeKey);
        cipher.update(enstring, encodeType, returnType)
        return cipher.final(returnType)
    }

    this.decode = function () {
        let algorithm = arguments[0] ? arguments[0] : null,
            enstring = arguments[1] ? arguments[1] : '',
            returnType = arguments[2] ? arguments[2] : '',
            encodeKey = arguments[3] ? arguments[3] : '',
            encodeType = arguments[4] ? arguments[4] : '',
            decipher = crypto.createDecipher(algorithm, encodeKey);
        decipher.update(enstring, encodeType, returnType)
        return decipher.final(returnType)
    }
}