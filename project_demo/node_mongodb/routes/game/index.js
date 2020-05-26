let express = require('express'),
    Router = express.Router(),
    JwtUtil = require('./../../utils/jwt'),
    BaseMongodb = require('./../../utils/mongodb/index'),
    baseMongodb = new BaseMongodb(),
    status = require('./../../comment'),
    tableName = 'game';

Router.post('/sudo', (req, res) => {
    let data = { ...req.body }
    baseMongodb.insert(tableName, data, (ret) => {
        if(!ret) {// 插入成功
            return res.json(status.code_3)
        } else {
            baseMongodb.findWithoutQuery(tableName, (_ret) => {
                if(!_ret) {
                    return res.json(status.code_4)
                } else {
                    let _index = 0
                    _ret = _ret.sort((a, b) => {
                        return a.useTime - b.useTime
                    })
                    _ret.map((v, i) => {
                        if(v.useTime === data.useTime) {
                            _index = i
                            return
                        }
                    })
                    return res.json({ code: 0, message: '挑战成功', data: { index: _index + 1 } })
                }
            })
        }
    })
    // return res.json(status.code_2)
})

module.exports = Router