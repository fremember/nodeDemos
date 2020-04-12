let AdapterClass = require('./adapter')

exports.encode = function () {
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

exports.decode = function () {
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