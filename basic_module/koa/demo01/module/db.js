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
    find (collectionName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let result = db.collection(collectionName).find(json)
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
    getObjectId (id) {// mongodb里面查询 _id 把字符串转换成对象
        return new ObjectID(id)
    }
}

module.exports = Db.getInstance()