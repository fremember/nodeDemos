let Util = require('./../getSource/index'),
    mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    _db,
    dbo;

module.exports = function () {
    let self = this
    /**
     * 根据主键id值查询数据库的一条记录
     * @param tableName string
     * @param id number
     * @param callback function
     * @return null
    */
    this.findOneById = (tableName, id, callback) => {
        let mongoId = new mongodb.ObjectID(id)
        connection((dbo, _db) => {
            dbo.collection(tableName).find({ '_id': mongoId }).toArray((err, result) => {
                if(err) {
                    callback(false)
                } else {
                    callback(result)
                }
            })
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
        connection((dbo, _db) => {
            dbo.collection(tableName).insertOne(rowInfo, (err, objects) => {
                if(err) {
                    callback(false)
                } else {
                    callback(objects)
                }
            })
        })
    }
    /**
     * @desc 根据条件修改
     * @param tableName string
     * @param whereJson json
     * @param rowInfo json
     * @param callback function
     * @return null
    */
    this.modify = (tableName, whereJson, rowInfo, callback) => {
        connection((dbo, _db) => {
            dbo.collection(tableName).updateOne(whereJson, { $set: rowInfo }, { safe: true }, (err) => {
                if(err) {
                    callback(false)
                } else {
                    callback(true)
                }
            })
        })
    }
    /**
     * @desc 根据主键id值删除数据库中的一条数据(可以修改成按条件删除)
     * @param tableName
     * @param id string
     * @param callback function
     * @return null
     */
    this.deleteOne = (tableName, id, callback) => {
        connection((dbo, _db) => {
            let mongoId = new mongodb.ObjectID(id)
            dbo.collection(tableName).deleteOne({ '_id': mongoId }, (err) => {
                if(err) {
                    callback(false)
                } else {
                    callback(true)
                }
            })
        })
    }
    /**
     * @desc 数据库查询语句
     * @param tableName string
     * @param whereJson object
     * @param orderByJson object
     * @param limitJson object
     * @param fieldsJson object
     * @param callback function
     * @return null
     */
    this.find = (tableName, whereJson, orderByJson, limitJson, fieldsJson, callback) => {
        if(whereJson['id']) {
            whereJson['_id'] = new mongodb.ObjectID(whereJson['id'])
            delete whereJson['id']
        }
        let limit = limitJson['pageSize'] ? limitJson['pageSize'] : 10,// 每页条数
            skip = limitJson['pageNum'] ? (limitJson['pageNum'] - 1) * limit : 0;// 跳过多少条
        connection((dbo, _db) => {
            dbo.collection(tableName).find(whereJson, fieldsJson).skip(skip).limit(limit).toArray((err, res) => {
                if(err) {
                    callback(false)
                    return
                } else {
                    callback(res)
                }
            })
        })
    }
    /**
     * @desc 数据库查询语句-查询全部
     * @param {*} tableName string 
     * @param {*} callback function
     * @return null
     */
    this.findWithoutQuery = (tableName, callback) => {
        connection((dbo, _db) => {
            dbo.collection(tableName).find({}).toArray((err, res) => {
                if(err) {
                    callback(false)
                } else {
                    callback(res)
                }
            })
        })
    }
    /* 数据库连接构造函数 */
    function connection (callback) {
        if(!dbo) {
            let dbConfig = Util.get(`${__dirname}/config.json`, 'db'),
                dbName = dbConfig['db_name'],
                url = dbConfig.url;
            MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
                if (err) {
                    throw err
                } else {
                    _db = db
                    dbo = db.db(dbName)
                    callback(dbo, _db)
                }
            })
        } else {
            callback(dbo, _db)
        }
    }
}