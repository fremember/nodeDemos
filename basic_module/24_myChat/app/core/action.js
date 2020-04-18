module.exports = function () {
	this._req;
	this._res;
	this.render = (jade, param) => {
		this._res.render(`${VIEW}${jade}`, param)
	}
}