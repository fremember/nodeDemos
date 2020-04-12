let Product = require('./product'),
	util = require('util');

function ProductA () {
	Product.call(this)
	this.getProduct = function () {
		console.log('product is get from clss of ProductA')
	}
}

util.inherits(ProductA, Product)

module.exports = ProductA