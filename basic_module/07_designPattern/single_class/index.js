let Single = require('./class.js'),
	singleObj1 = new Single('2020-03-02'),
	singleClass1 = singleObj1.getInstance('2020-03-02'),
	singleObj2 = new Single('2020-03-01'),
	singleClass2 = singleObj1.getInstance('2020-03-01');

singleClass1.show()

singleClass2.show()