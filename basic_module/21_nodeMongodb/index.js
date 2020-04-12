let BaseMongodb = require('./base_mongodb'),
    baseMongodb = new BaseMongodb(),
    rowInfo = {},
    rowInfoNextOne = {},
    rowInfoNextTwo = {},
    rowInfoNextThree = {},
    tableName = 'node_book';
/**
 * findOneById 校验
 */
// let id = '5e7af8937673b4c9ed317820'
// baseMongodb.findOneById(tableName, id, (ret) => {
//     console.log(ret)
// })

/**
 * insert 校验
*/
// rowInfo.book_name = 'php book'
// rowInfo.author = 'pxy'
// rowInfo.book_id = '5'
// baseMongodb.insert(tableName, rowInfo, (ret) => {
//     console.log(ret)
// })

/**
 * modify 校验
*/
// let newInfo = {},
//     id = '5e7c3c6ee9b1b232feeed1ca';
// newInfo.book_name = 'Java Demo'
// baseMongodb.modify(tableName, id, newInfo, (ret) => {
//     console.log(ret)
// })

/**
 * remove 校验
 */
// let id = '5e7c40af437d21342e345d79'
// baseMongodb.deleteOne(tableName, id, (ret) => {
//     console.log(ret)
// })

/**
 * find 校验
 */
let whereJson = {
        author: 'fmoment'
    },
    orderByJson = {
        book_name: 1
    },
    limitJson = {
        pageNum: 1,// 下标从1开始
        pageSize: 2
    },
    fieldsJson = {
        book_name: 1,
        author: 1
    };
baseMongodb.find(tableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
    console.log(ret)
})