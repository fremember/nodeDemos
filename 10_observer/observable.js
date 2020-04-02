module.exports = function () {
	let m_obserSet = [],
		_self = this;

	/**
	 * 添加观察者
	 * @param object observer
	 */
	this.addObser = function (observer) {
		m_obserSet.push(observer)
	}

	/**
	 * 删除观察者
	 * @param object observer
	 */
	this.delObser = function (observer) {
		if(m_obserSet[observer]) {
			delete m_obserSet[observer]
		}
	}

	/**
	 * 通知所有观察者
	 */
	this.doAction = function () {
		console.log("Observer do some action")
		_self.notifyAllObserver()
	}

	/**
	 * 执行所有观察者中的update方法
	 */
	this.notifyAllObserver = function () {
		for(let key in m_obserSet) {
			m_obserSet[key].update()
		}
 	}
}