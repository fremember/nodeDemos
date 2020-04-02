let fs = require('fs'),
    sys = require('util');

exports.get = (filename, key) => {
    let configJson = {}
    try {
        let str = fs.readFileSync(filename, 'utf8')
        configJson = JSON.parse(str)
    } catch (err) {
        sys.debug("JSON parse fails")
    }
    return configJson[key]
}