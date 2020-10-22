let express = require('express'),
    svgCaptcha = require('svg-captcha'),
    Router = express.Router(),
    encry = require('./../../utils/encryption');

Router
    .get('/getImgVerify', (req, res) => {// 图形验证码
        let data = { ...req.query },
            code = svgCaptcha.create(data);
        res.cookie('randomcode', encry.md5(code.text.toLowerCase()))
        return res.json({ code: 0, data: code.data, message: '验证码获取成功' })
    })
    .get('userRouter', (req, res) => {// 获取动态路由
        return res.json({ code: 0, data: [], message: '获取动态路由成功' })
    })


module.exports = Router