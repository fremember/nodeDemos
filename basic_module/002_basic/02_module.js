const PI = Math.PI
/**
 * 验证exports使用
 */
/*
exports.area = (r) => {
    return PI * Math.pow(r, 2)
}
exports.circumference = (r) => {
    return 2 * PI * r
}
*/

/**
 * 通常exports方式使用方法是：
 *     exports. [function name] = [function name]
 * moudle.exports方式使用方法是：
 *     moudle.exports = [function name]
 * 
 * exports 返回的是模块函数
 * module.exports 返回的是模块对象本身， 返回的是一个类
 * 
 * 使用上的区别是
 * exports的方法可以直接调用
 * module.exports需要new对象之后才可以调用
 * 
 * 如果exports和module.exports同时存在，那么require后只能获取到module.exports中的内容
 */

 
/**
 * 验证module.exports
 */
/*
module.exports = {
    area2: (r) => {
        return PI * Math.pow(r, 2)
    },
    circumference2: (r) => {
        return 2 * PI * r
    }
}
*/