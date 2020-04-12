let fs = require('fs'),
    sys = require('util');
const { config } = require('process');

exports.get = (fileName, key) => {
    let configJson = {}
    try {
        let str = fs.readFileSync(fileName, 'utf8')
        configJson = JSON.parse(str)
    } catch (err) {
        sys.debuglog('JSON parse fails')
    }
    if(configJson[key]) {
        return configJson[key]
    } else {
        return null
    }
}