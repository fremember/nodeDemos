let Util = require('./util'),
    mysql = require('mysql'),
    dbClient;
module.exports = function () {
    __constructor()
    /**
     * @desc 根据主键id值查询数据库的一条数据
     * @param tableName String
     * @param idJson id
     * @param callback function
     * @return null
    */
    this.findOneById = (tableName, idJson, callback) => {
        dbClient.query(`SELECT * FROM ${tableName} where ?`, idJson, (error, results) => {
           if(error) {
                console.log('GetData Error: ' + error.message)
                dbClient.end()
                callback(false)
            } else {
                if(results) {// 如果查询到数据则返回一条数据即可
                    callback(results.pop())
                } else {// 查询数据为空则返回空数据
                    callback(results)
                }
            }
        })
    }
    /**
     * @desc 向数据库中插入数据
     * @param tableName string
     * @param rowInfo json
     * @param callback function
     * @return null
     */
    this.insert = (tableName, rowInfo, callback) => {
        dbClient.query(`INSERT INTO ${tableName} SET ?`, rowInfo, (err, result) => {
            if(err) throw err
            callback(result.insertId)
        })
    }
    /**
     * @desc 删除数据库中的一条数据
     * @param tableName string
     * @param idJson json
     * @param callback function
     * @return null
     */
    this.remove = (tableName, idJson, callback) => {
        dbClient.query(`DELETE FROM ${tableName} where ?`, idJson, (err, results) => {
            if(err) {// 删除失败
                console.log(`ClientReady Error: ${error.message}`)
                dbClient.end()
                callback(false)
            } else {
                callback(true)
            }
        })
    }
    /**
     * @desc 修改数据库的一条数据
     * @param tableName string
     * @param idJson json
     * @param rowInfo json
     * @param callback function
     * @return null
     */
    this.modify = (tableName, idJson, rowInfo, callback) => {
        dbClient.query(`UPDATE ${tableName} SET ? where ?`, [rowInfo, idJson], (err, result) => {
            if(err) {
                console.log(`ClientReady Error: ${error.message}`)
                callback(false)
            } else {
                callback(true)
            }
        })
    }
    /**
     * @desc 条件查询
     * @param tableName string
     * @param whereJson json desc(and和or区别，其中的条件为key值、连接符大于小于还是等于、value值)
     * @param orderByJson json desc({'key' : 'time', 'type':'desc'}) 
     * @param limitArr array desc（第一个元素是返回偏移量，第二个是返回数量，空返回全部）
     * @param fieldsArr array desc（返回哪些字段）
     * @param callback function
     * @return null
     */
    this.find = (tableName, whereJson, orderByJson, limitArr, fieldsArr, callback) => {
        let andWhere = whereJson['and'],
            orWhere = whereJson['or'],
            addArr = [],
            orArr = [];
        /* 将数组转换为where and条件数组 */
        andWhere.forEach(v => {
            addArr.push(`${v['key']}${v['opts']}${v['value']}`)
        })
        /* 将数组转换为where or条件array */
        orWhere.forEach(v => {
            orArr.push(`${v['key']}${v['opts']}${v['value']}`)
        })
        /* 条件判断是否存在，如果存在则转换相应的添加语句 */
        let filedsStr = fieldsArr.length > 0 ? fieldsArr.join(',') : '*',
            andStr = addArr.length > 0 ? addArr.join(' and ') : '',
            orStr = orArr.length > 0 ? ' or ' + orArr.join(' or ') : '',
            limitStr = limitArr.length > 0 ? ' limit ' + limitArr.join(',') : '',
            orderStr = orderByJson ? ' order by ' + orderByJson['key'] + ' ' + orderByJson['type'] : '';
        /* 执行MySQL语句 */
        dbClient.query(`SELECT ${filedsStr} FROM ${tableName} WHERE ${andStr}${orStr}${orderStr}${limitStr}`, (err, results) => {
            if(err) {
                console.log(`GetData Error: ${error.message}`)
                dbClient.end()
                callback(false)
            } else {
                callback(results)
            }
        })
    }
    /**
     * 数据库连接构造函数
     */
    function __constructor () {
        let dbConfig = Util.get('config.json', 'db'),
            client = { ...dbConfig };// 获取mysql配置信息
        delete client.dbName
        dbClient = mysql.createConnection(client)// 创建数据库连接
        dbClient.connect()// 连接数据库
        /* 执行mysql指令，连接mysql服务器的一个数据库 */
        dbClient.query(`USE ${dbConfig.dbName}`, (error, results) => {
            if(error) {
                console.log(`ClientConnectionReady Error: ${error.message}`)
                dbClient.end()
            } else {// 连接数据库成功
                console.log('connection local mysql success')
            }
        })
    }
}