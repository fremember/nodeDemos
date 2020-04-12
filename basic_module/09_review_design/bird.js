let util = require('util'),
	Animal = require('./animal');

function Bird () {
	Animal.call(this)

	util.inherits(Bird, Animal)

	this.say = function () {
		console.log('ji……ji')
	}
}

module.exports = Bird