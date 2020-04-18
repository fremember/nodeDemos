module.exports = function () {
	let _req = arguments[0],
		_res = arguments[1];
	this.checkSession = (model) => {
		if(model == 'login') {
			return true
		} else if(sessionLib.username && sessionLib.username != '') {
			return true
		} else {
			return false
		}
	}
	this.login = () => {
		let room = lib.config.get(`${CONF}room.json`, '')
		lib.httpParam.POST('username', (value) => {
			sessionLib.username = value
			_res.render(`${VIEW}main.jade`, { 'user': value, 'rooms': room })

		})
		return
	}
}