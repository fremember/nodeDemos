let fs = require('fs'),
	BASE_DIR = __dirname,
	curDate = new Date().getTime();
/**
 * 重命名文件
 * 第一个参数是源文件的路径和名称
 * 第二个参数是源文件修改后的路径和名称
 */
/*fs.rename(BASE_DIR + '/fremember.txt', BASE_DIR + '/' + (curDate + '.txt'), (err) => {
	if(err) {
		throw err
	} else {
		console.log('renamed complete')
	}
})*/

/**
 * 修改文件权限
 * 第一个参数是源文件的路径和名称
 * 第二个参数是修改后的权限
 */
/*fs.chmod(BASE_DIR + '/pxy.txt', '777', (err) => {
	if(err) {
		throw err
	} else {
		console.log('chmod complete')
	}
})*/

/**
 * 获取文件源信息
 *
 * 返回的结果：
 * 
 * dev: 设备编号
 * mode: 文件类型和存储权限
 * nlink: 连接到该文件的硬连接数目
 * uid: 用户ID
 * gid: 组ID
 * rdev: 若该文件为设备文件，则为其设备编号
 * blksize: 块的大小，文件系统的I/O缓冲区大小
 * ino: 节点
 * size: 文件节数的大小
 * blocks: 块数
 * atimeMs: 最后一次访问的毫秒数
 * mtimeMs: 最后一次更改的毫秒数
 * ctimeMs: 最后一次改变时间的毫秒数
 * birthtimeMs: 文件创建时间的毫秒数,
 * atime: 最后一次访问的UTC时间
 * mtime: 最后一次更改的UTC时间
 * ctime: 最后一次改变时间的UTC时间
 * birthtime: 文件创建时间的UTC时间
 */
/*fs.stat(BASE_DIR + '/fremember.txt', (err, stats) => {
	if(err) {
		throw err
	} else {
		console.log(stats)
	}
})*/

/**
 * 判断文件是否存在
 * 回调函数的参数 exists boolean
 */
/*fs.exists(BASE_DIR + '/fremember.txt', (exists) => {
	if(exists) {
		console.log('文件存在')
	} else {
		console.log('文件不存在')
	}
})*/

/**
 * 删除文件
 */
/*fs.unlink(BASE_DIR + '/aa.txt', (err) => {
	if(err) {
		throw err
	} else {
		console.log('delete complete')
	}
})*/

let cur = new Date().getTime()
fs.mkdir(BASE_DIR + '/' + cur, (err) => {// 创建目录
	if(err) {
		throw err
	} else {
		// 在创建的目录中新建文件，并写入内容
		fs.writeFile(BASE_DIR + '/' + cur + '/bb.txt', new Date().getTime(), (e) => {
			if(e) {
				console.log(e)
			} else {
				console.log('mkdir and writeFile complete')
			}
		})
	}
})




















