let util = require('util'),
	Animal = require('./animal');

function Duck () {
	Animal.call(this)

	util.inherits(Duck, Animal)

	this.say = function () {
		console.log('ga……ga')
	}
}

let duck = new Duck()

module.exports = duck.say