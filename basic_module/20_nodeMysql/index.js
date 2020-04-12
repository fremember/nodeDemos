let BaseModel = require('./base_model'),
    baseModel = new BaseModel(),
    rowInfo = {},
    tableName = 'node_book';

/**
 * findeOneById验证
 */
// let idJson = { 'book_id': 4 }
// baseModel.findOneById(tableName, idJson, (ret) => {
//     console.log(ret)
// })

/**
 * insert验证
 */
// rowInfo = {
//     book_name: 'node实战开发',
//     author: 'fremember'
// }
// baseModel.insert(tableName, rowInfo, (ret) => {
//     console.log(ret)
// })

/**
 * remove验证
 */
// let idJson = { 'book_id': 5 }
// baseModel.remove(tableName, idJson, (ret) => {
//     console.log(ret)
// })

/**
 * modify 验证
 */
// let idJson = { book_id: 4 }
// rowInfo = {
//     book_name: 'asdfghjkl'
// }
// baseModel.modify(tableName, idJson, rowInfo, (ret) => {
//     console.log(ret)
// })

/**
 * find验证
 */
let whereJson = {
    and: [
        {'key': 'book_name', 'opts': '=', 'value' : '"node实战开发"'},
        {'key': 'author', 'opts': '=', 'value' : '"fremember"'}
    ],
    or: [
        { key: 'book_id', opts: '<', value: 10 }
    ]
},
    fieldsArr = ['book_name', 'author', 'time'],
    orderArr = { key: 'time', type: 'desc' },
    limitArr = [0, 10];
baseModel.find(tableName, whereJson, orderArr, limitArr, fieldsArr, (ret) => {
    console.log(ret)
})
