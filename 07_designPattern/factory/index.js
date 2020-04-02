let ProductFactory = require('./productFactory'),
	ProductA = ProductFactory.createProduct('ProductA'),
	ProductB = ProductFactory.createProduct('ProductB');

ProductA.getProduct()
ProductB.getProduct()