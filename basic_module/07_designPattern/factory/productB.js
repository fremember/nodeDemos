let Product = require('./product'),
	util = require('util');

function ProductB () {
	Product.call(this)
	this.getProduct = function () {
		console.log('product is get from clss of ProductB')
	}
}

util.inherits(ProductB, Product)

module.exports = ProductB