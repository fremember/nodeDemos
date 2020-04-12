let fs = require('fs')// 引入文件模块
function getFileData(cb) {
	fs.readFile('fs_read.txt', (err, data) => {// 读取文件
		if(err) {
			console.log(err)
		} else {
			cb(data.toString())// 将读取的二进制流数据专车个字符串
		}
	})
}
function returnData() {// 打印读取内容
	getFileData((data) => {
		setTimeout(() => {
			console.log(data)
		}, 1000)
	})
}
returnData()