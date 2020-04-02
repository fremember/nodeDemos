// exports.show = () => {
//     console.log(123)
// }

// 导出的是构造函数
// module.exports = function () {
//     this.name = 'fremember'
//     this.age = 29
//     this.sing = () => {
//         console.log(123)
//     }
// }

// 导出的是对象
// module.exports = {
//     name: 'fremember',
//     age: 29,
//     sing: () => {
//         console.log(123)
//     }
// }

// 以下也是导出对象
exports.sing = () => {
    console.log('sing')
}
exports.song = () => {
    console.log('song')
}