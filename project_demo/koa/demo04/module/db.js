let MongoDB = require('mongodb'),
    MongoClient = MongoDB.MongoClient,
    ObjectID = MongoDB.ObjectID,
    Config = require('./config.js');

class Db {
    static getInstance () {// 单例  多次实例化实例不共享的问题
        if(!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance
    }
    constructor () {
        this.dbClient = ''// 属性，放db对象
        this.connect()// 实例化的时候就连接数据库
    }
    connect () {// 连接数据库
        let _this = this
        return new Promise((resolve, reject) => {
            if(!_this.dbClient) {// 解决数据库多次连接的问题
                MongoClient.connect(Config.dbUrl, { useUnifiedTopology: true }, (err, client) => {
                    if(err) {
                        reject(err)
                    } else {
                        _this.dbClient = client.db(Config.dbName)
                        resolve(_this.dbClient)
                    }
                })
            } else {
                resolve(_this.dbClient)
            }
        })
    }
    /**
     * @desc 数据库查询语句
     * @param collectionName string
     * @param whereJson object
     * @param orderByJson object
     * @param fieldsJson object
     * @return Promise
     */
    find(collectionName, whereJson, orderByJson, fieldsJson) {
        return new Promise((resolve, reject) => {
            if (whereJson['id']) {
                whereJson['_id'] = new mongodb.ObjectID(whereJson['id'])
                delete whereJson['id']
            }
            let limit = whereJson['pageSize'] ? Number(whereJson['pageSize']) : 10, // 每页条数
                skip = whereJson['pageNum'] ? (Number(whereJson['pageNum'] - 1)) * limit: 0; // 跳过多少条
            delete whereJson['pageSize']
            delete whereJson['pageNum']
            this.connect().then(db => {
                let result = db.collection(collectionName).find(whereJson, fieldsJson).skip(skip).limit(limit).sort(orderByJson)
                result.toArray((err, docs) => {
                    if(err) {
                        reject(err)
                        return
                    }
                    resolve(docs)
                })
            })
        })
    }
    update (collectionName, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collectionName).updateOne(json1, {
                    $set: json2
                }, (err, result) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        })
    }
    insert (collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(collectionName).insertOne(json, (err, result) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        })
    }
    remove (collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).removeOne(json, (err, result) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                })
            })
        })
    }
    count (collectionName) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collectionName).countDocuments({}, (err, count) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(count)
                    }
                })
            })
        })
    }
    getObjectId (id) {// mongodb里面查询 _id 把字符串转换成对象
        return new ObjectID(id)
    }
}

module.exports = Db.getInstance()