let utils = require('utility')
module.exports.md5 = function (cont) {
	let str = 'fremember_Pwd18760567910!@#$%^&*(){}?:"><~~'
	return utils.md5(utils.md5(cont + str));
}
