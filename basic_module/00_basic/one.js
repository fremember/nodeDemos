// for(let i = 0; i < 10; i++) {
//     setTimeout(() => {
//         console.log(i)// 分别打印0, 1, 2, 3, 4, 5, 6, 7, 8, 9
//     }, 1000)
// }

// for(var i = 0; i < 10; i++) {
//     setTimeout(() => {
//         console.log(i)// 所有的都是10
//     }, 1000)
// }

// for(var i = 0; i < 10; i++) {
//     exec(i, function(i) {
//         console.log(i)
//     })
// }
// function exec(i, cb) {
//     setTimeout(() => {
//         cb(i)// 分别打印0, 1, 2, 3, 4, 5, 6, 7, 8, 9
//     }, 1000)
// }

// let Module = null
// try {// 引入成功，会走这儿的逻辑
//     Module = require('./module')
// } catch (err) {// 引入不成功的逻辑
//     throw new Error(err)
// }

// if(Module.show) {
//     Module.show()
// } else {
//     throw new Error('this method show is not exists')
// }

// 导出的是构造函数
let Module = require('./module'),
    mod = new Module();
console.log(Module)// [Function]
console.log(mod)// { name: 'fremember', age: 29, sing: [Function] }
console.log(mod.name)// fremember
console.log(mod.age)// 29
mod.sing()// 123

// 导出的是对象
/*let mod = require('./module')
console.log(mod)// { name: 'fremember', age: 29, sing: [Function: sing] }
console.log(mod.name)// fremember
console.log(mod.age)// 29
mod.sing()// 123*/

/*let obj = require('./module')
console.log(obj)// { sing: [Function], song: [Function] }
obj.sing()// sing
*/