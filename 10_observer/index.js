let Fober = require('./firstObserver'),
	Sober = require('./secondObserver'),
	Oble = require('./observable'),
	/**
	 * 创建观察者类对象
	 */
	fober = new Fober(),
	sober = new Sober(),
	oble = new Oble();

/**
 * 添加观察者对象
 */
oble.addObser(fober)
oble.addObser(sober)

oble.doAction()


