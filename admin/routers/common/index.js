/*
 * @Author: fremember
 * @Date: 2021-09-15 16:04:08
 * @Description: 公共操作模块
 */
const express = require('express'),
    Router = express.Router(),
    svgCaptcha = require('svg-captcha'),
    encry = require('../../utils/encryption'),
    JwtUtil = require('./../../utils/jwt'),
    utils = require('utility'),

    formidable = require('formidable'),

    BaseMongodb = require('./../../utils/mongodb/index'),
    baseMongodb = new BaseMongodb(),
    status = require('./../../commonStatus.js'),
    fs = require('fs'),
    userTableName = 'users',
    routesTableName = 'routes';

Router
    .post('/getImgVerify', (req, res) => {// 获取图形验证码
        let data = { ...req.body },
            code = svgCaptcha.create(data);
        res.cookie('randomcode', encry.md5(code.text.toLowerCase()))
        return res.json({ code: 0, data: code.data, message: '验证码获取成功' })
    })
    .get('/checkUsername', (req, res) => {
        let whereJson = { ...req.query },
            orderByJson = {},
            limitJson = {
                pageNum: 1,// 下标从1开始
                pageSize: 10
            },
            fieldsJson = {};
        baseMongodb.find(userTableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
            if (ret.length > 0) {
                return res.json(status.code_1)
            } else {
                return res.json({ code: 0, msg: '用户名可用' })
            }
        })
    })
    .post('/register', (req, res) => {

        let { username, userpwd, verificationCode } = req.body,
            { randomcode } = req.cookies;
        if (randomcode === encry.md5(verificationCode)) {
            // 角色需要在用户列表中，又超级管理员指派
            baseMongodb.insert(userTableName, { username, userpwd: utils.sha256(userpwd), rolename: 'admin' }, (ret) => {
                if (ret) {
                    let { acknowledged } = ret
                    if ( acknowledged ) {// 注册成功
                        res.json({ code: 0, msg: '注册成功', data: true })
                    } else {
                        res.json(status.code_3)
                    }
                } else {
                    res.json(status.code_3)
                }
            })
        } else {
            return res.json(status.code_2)
        }
    })
    .post('/login', (req, res) => {// 登录接口
        let { username, userpwd, verificationCode } = req.body,
            { randomcode } = req.cookies,
            whereJson = { username, userpwd: utils.sha256(userpwd) },
            orderByJson = {},
            limitJson = {
                pageNum: 1,// 下标从1开始
                pageSize: 10
            },
            fieldsJson = {};
        if (randomcode === encry.md5(verificationCode)) {// 验证验证码是否正确
            baseMongodb.find(userTableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {// 数据库查询，通过用户名和密码查询
                if (ret && Array.isArray(ret) && ret.length > 0) {// 查询到结果
                    let doc = ret[0],
                        _id = doc._id.toString(),
                        jwt = new JwtUtil(_id),// 将用户id传入并生成token
                        token = jwt.generateToken();// 生成token
                    res.clearCookie('randomcode')
                    delete doc.userpwd
                    res.cookie('cookieToken', token)
                    return res.send({ code: 0, msg: '登录成功', data: { ...doc, token: token } })// 将 token 返回给客户端
                } else {
                    // 判断用户名是否输入正确
                    baseMongodb.find(userTableName, { username }, orderByJson, limitJson, fieldsJson, (ret1) => {
                        if (ret1 && Array.isArray(ret1) && ret1.length > 0) {
                            return res.send(status.code_7)
                        } else {
                            baseMongodb.find(userTableName, { userpwd: utils.sha256(userpwd) }, orderByJson, limitJson, fieldsJson, (ret2) => {
                                if (ret2 && Array.isArray(ret2) && ret2.length > 0) {
                                    return res.send(status.code_6)
                                } else {
                                    return res.json(status.code_5)
                                }
                            })
                        }
                    })
                }
            })
        } else {
            return res.json(status.code_2)
        }
    })
    .get('/logout', (req, res) => {// 退出登录
        let { token } = req.headers,
            { cookieToken } = req.cookies;
        if (token === cookieToken) {
            res.clearCookie('cookieToken')
            return res.send({ code: 0, msg: '退出成功' })
        } else {
            return res.send(status.code_8)
        }
    })
    .get('/getRoutes', (req, res) => {// 登录用户获取前端路由
        let whereJson = { ...req.query },
            orderByJson = {},
            limitJson = {
                pageNum: 1,// 下标从1开始
                pageSize: 100
            },
            fieldsJson = {};
        // 支持模糊查询
        Object.keys(whereJson).forEach(attr => {
            whereJson[attr] = new RegExp(whereJson[attr])
        })
        baseMongodb.find(routesTableName, whereJson, orderByJson, limitJson, fieldsJson, (ret) => {
            if (ret.length > 0) {
                let parentArr = [],
                    childrenArr = [];
                ret.forEach(item => {
                    let _temp = item
                    _temp.children = []
                    if(item.parent === '') {
                        parentArr.push(_temp)
                    } else {
                        childrenArr.push(_temp)
                    }
                })
                parentArr.forEach((item, index) => {
                    parentArr[index].children = childrenArr.filter(itm => itm.parent === item.name)
                })
                return res.json({ code: 0, msg: '前端路由查询成功', data: parentArr })
            } else {
                return res.json(status.code_9)
            }
        })
    })

module.exports = Router