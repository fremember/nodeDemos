let ProductA = require('./productA'),
	ProductB = require('./productB');

exports.createProduct = function (type) {
	switch (type) {
		case 'ProductA':
			return new ProductA()
			break;
		case 'ProductB':
			return new ProductB()
			break;
	}
}