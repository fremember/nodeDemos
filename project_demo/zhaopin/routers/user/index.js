let express = require('express'),
    Router = express.Router(),
    JwtUtil = require('./../../utils/jwt'),
    BaseMongodb = require('./../../utils/mongodb/index'),
    baseMongodb = new BaseMongodb(),
    status = require('./../../comment'),
    tableName = 'user';

Router.post('/login', (req, res) => {
    let whereJson = { ...req.body },
        orderByJson = {},
        limitJson = {
            pageNum: 1,// 下标从1开始
            pageSize: 10
        },
        fieldsJson = {
            username: 1,
            password: 0
        };
    baseMongodb.find(tableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
        if (ret) {// 这里需要加上token逻辑
            if (ret.length > 0) {
                let data = ret[0]
                delete data.password
                res.cookie('userid', data._id)
                let _id = data._id.toString(),
                    jwt = new JwtUtil(_id),// 将用户id传入并生成token
                    token = jwt.generateToken();
                return res.json({ code: 0, message: '登录成功', data: { ...data, token: token } })// 将 token 返回给客户端
            } else {
                return res.json(status.code_2)
            }
        } else {
            return res.json(status.code_1)
        }
    })
})

module.exports = Router