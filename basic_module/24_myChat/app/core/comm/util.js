let Config = {}

function get (fileName, key) {
	if(Config[fileName]) {
		return Config[fileName][key] ? Config[fileName][key] : Config[fileName]
	}
	let configJson = {}
	try {
		let str = lib.fs.readFileSync(fileName, 'utf8')
		configJson = JSON.parse(str)
	} catch (e) {
		return {}
	}
	Config[fileName] = configJson
    return configJson[key] ? configJson[key] : configJson
}

function getSource (fileName) {
	if(Config[fileName]) {
		return Config[fileName] ? Config[fileName] : Config[fileName]
	}
	let str = ''
	try {
		str = lib.fs.readFileSync(fileName, 'utf8')
	} catch (e) {
		str = ''
	}
	Config[fileName] = str
	return str
}

exports.get = get
exports.getSource = getSource