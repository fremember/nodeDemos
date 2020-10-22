let express = require('express'),
    Router = express.Router(),
    JwtUtil = require('./../../utils/jwt'),
    BaseMongodb = require('./../../utils/mongodb/index'),
    baseMongodb = new BaseMongodb(),
    encry = require('./../../utils/encryption'),
    status = require('./../../comment'),


    tableName = 'users',
    whereJson = {},
    orderByJson = {},
    limitJson = {
        pageNum: 1,// 下标从1开始
        pageSize: 10
    },
    fieldsJson = {
        username: 1,
        password: 0
    };;

Router
    /**
     * 登录
     */
    .post('/login', (req, res) => {
        whereJson = {}
        whereJson = { ...req.body }
        whereJson.userpwd = encry.md5(whereJson.userpwd)
        delete whereJson.verificationCode

        let { verificationCode } = req.body,
            { randomcode } = req.cookies;
        if (randomcode === encry.md5(verificationCode)) {
            baseMongodb.find(tableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
                if (ret.length > 0) {
                    let data = ret[0]
                    delete data.userpwd
                    res.cookie('userid', data._id)
                    let _id = data._id.toString(),
                        jwt = new JwtUtil(_id),// 将用户id传入并生成token
                        token = jwt.generateToken();
                    // 新增一张新表，存放token和用户名对应的关系
                    return res.json({ code: 0, message: '登录成功', data: { ...data, accessToken: token } })// 将 token 返回给客户端
                } else {
                    return res.json(status.code_2)
                }
            })
        }
    })
    /**
     * 验证用户名唯一
     */
    .get('/checkUsername', (req, res) => {
        whereJson = {}
        whereJson = { ...req.query }
        baseMongodb.find(tableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
            if(ret.length > 0) {
                return res.json(status.code_5)
            } else {
                return res.json({ code: 0, message: null, data: null })
            }
        })
    })
    /**
    * 注册
    */
    .post('/register', (req, res) => {
        let { verificationCode } = req.body
        insertObj = { ...req.body }
        let { randomcode } = req.cookies
        insertObj.userpwd = encry.md5(insertObj.userpwd)

        delete insertObj.verificationCode
        if (randomcode === encry.md5(verificationCode)) {
            baseMongodb.insert(tableName, insertObj, (ret) => {
                let { result } = ret
                if (result.ok > 0) {
                    return res.json({ code: 0, message: '注册成功', data: null })
                } else {
                    return res.json(status.code_6)
                }
            })
        }
    })
    .post('/getUserInfo', (req, res) => {
        console.log(req.headers.accesstoken)
        return res.json({ code: 0, message: '登录成功', data: { avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', username: 'admin', roleName: 'admin' } })
    })


module.exports = Router