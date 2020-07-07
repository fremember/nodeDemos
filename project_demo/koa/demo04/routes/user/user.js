let router = require('koa-router')(),
    svgCaptcha = require('svg-captcha'),
    DB = require('./../../module/db.js'),
    utility = require('utility');
function imgCodeError (ctx) {// 处理验证码过期的方法
    if(!ctx.session.imgcode) {
        ctx.body = {
            code: -1,
            data: null,
            message: '图形验证码过期'
        }
    } else {
        ctx.body = {
            code: -1,
            data: null,
            message: '图形验证码输入错误'
        }
    }
}
router
    .get('/', async ctx => {
        ctx.redirect('/user/index')
    })
    .get('/index', async ctx => {
        ctx.render('user/index')
    })
    .get('/login', async ctx => {
        ctx.render('user/login')
    })
    .get('/authority', async ctx => {
        ctx.render('user/authority')
    })
    .get('/add', async ctx => {
        ctx.render('user/add')
    })
    .get('/getUserItem/:uid', async ctx => {
        let queryObj = await DB.find('user', { uid: Number(ctx.params.uid), pageNum: 1, pageSize: 10 });
        if (queryObj.length >= 0) {
            let data = { ...queryObj[0] }
            delete data.password
            ctx.body = { code: 0, data: data, message: '用户信息获取成功' }
        } else {
            ctx.body = { code: -1, data: null, message: '该用户不存在' }
        }
    })
    .get('/code', async ctx => {
        let captcha = svgCaptcha.create({
            size: 4,
            fontSize: 30,
            width: 120,
            height: 40,
            background: "#cc9966"
        })
        // 保存生成的验证码
        ctx.session.imgcode = captcha.text
        // 设置响应头
        ctx.response.type = 'image/svg+xml'
        ctx.body = captcha.data
    })
    .post('/doLogin', async ctx => {
        let { username, password, imgcode } = ctx.request.body
        ctx.session.token = null
        /**
         * 1、判断用户输入的图形验证码是否正确
         * 2、根据用户名和密码，查询数据库，查询到数据，则登录成功，查询不到数据，则登录不成功
         */
        if(ctx.session.imgcode && imgcode.toLocaleLowerCase() == ctx.session.imgcode.toLocaleLowerCase()) {
            let result = await DB.find('user', { username, password, pageNum: 1, pageSize: 10 }),
                res = {}
            if(result.length > 0) {
                res.code = 0
                res.data = utility.sha256(utility.md5(`${username}###${password}`))
                ctx.session.token = res.data
                res.message = '登录成功'
                ctx.session.imgcode = null
            } else {
                res.code = -1
                res.data = null
                res.message = '用户名或密码错误'
            }
            ctx.body = res
        } else {
            imgCodeError(ctx)
        }
    })
    .post('/register', async ctx => {
        let { username, password, imgcode } = ctx.request.body
        ctx.session.token = null
        /**
         * 1、判断用户输入的图形验证码是否正确
         * 2、将用户名和密码写入表中，根据用户名和密码
         */
        if(ctx.session.imgcode && imgcode.toLocaleLowerCase() == ctx.session.imgcode.toLocaleLowerCase()) {
            let queryRes = await DB.find('user', { username, pageNum: 1, pageSize: 10 }),
                result = null,
                res = {};
            if(queryRes.length > 0) {
                res.code = -1
                res.data = null
                res.message = '用户名重复'
            } else {
                result = await DB.insert('user', { username, password })
                if(result.result.ok >= 1) {
                    res.code = 0
                    res.data = null
                    res.message = '注册成功'
                    ctx.session.imgcode = null
                } else {
                    res.code = -1
                    res.data = null
                    res.message = '注册失败'
                }
            }
            ctx.body = res
        } else {
            imgCodeError(ctx)
        }
    })
    .post('/resetPwd', async ctx => {
        let { username, password, imgcode } = ctx.request.body
        ctx.session.token = null
        /**
         * 1、判断用户输入的图形验证码是否正确
         * 2、修改用户名为username的密码为password
         */
        if(ctx.session.imgcode && imgcode.toLocaleLowerCase() == ctx.session.imgcode.toLocaleLowerCase()) {
            let queryRes = await DB.find('user', { username, pageNum: 1, pageSize: 10 }),
                result = null,
                res = {};
            if(queryRes.length == 0) {
                res.code = -1
                res.data = null
                res.message = `不存在${username}用户`
            } else {
                result = await DB.update('user', { username }, { password })
                if(result.result.ok >= 1) {
                    res.code = 0
                    res.data = null
                    res.message = '密码重置成功'
                    ctx.session.imgcode = null
                } else {
                    res.code = -1
                    res.data = null
                    res.message = '密码重置失败'
                }
            }
            ctx.body = res
        } else {
            imgCodeError(ctx)
        }
    })
    .get('/list', async ctx => {
        if (ctx.header.token === ctx.session.token) {
            let json = {}
            if (ctx.query) {
                json = {
                    ...ctx.query
                }
            }
            if (json.id) {
                json.id = Number(json.id)
            }
            let queryObj = await DB.find('user', json),
                count = await DB.count('user');
            if (queryObj.length >= 0) {
                let arr = queryObj
                arr.forEach((v, i) => {
                    delete arr[i].password
                })
                ctx.body = { code: 0, data: arr, total: count, message: '用户列表获取成功' }
            } else {
                ctx.body = { code: -1, data: null, message: '用户列表获取失败' }
            }
        } else {
            ctx.body = { code: -1, data: null, message: 'token过期' }
        }
    })
    .get('/delleteItem/:uid', async ctx => {
        if (ctx.header.token === ctx.session.token) {
            let del = await DB.remove('user', { uid: Number(ctx.params.uid) })
            if (del.result.ok >= 1) {
                ctx.body = { code: 0, data: null, message: '删除成功' }
            } else {
                ctx.body = { code: -1, data: null, message: '删除失败' }
            }
        } else {
            ctx.body = { code: -1, data: null, message: 'token过期' }
        }
    })
    .post('/commonCheck', async ctx => {
        let copywriting = {
            username: '该用户名',
            realname: '该真实姓名',
            email: '该邮箱',
            phone: '该手机号'
        }
        if (ctx.header.token === ctx.session.token) {
            let attr = Object.keys(ctx.request.body)[0],
                queryObj = await DB.find('user', { ...ctx.request.body, pageNum: 1, pageSize: 10 });
            if (queryObj.length > 0) {
                ctx.body = { code: -1, data: null, message: `${copywriting[attr]}已存在` }
            } else {
                ctx.body = { code: 0, data: null, message: `${copywriting[attr]}不存在` }
            }
        } else {
            ctx.body = { code: -1, data: null, message: 'token过期' }
        }
    })
    .post('/doAdd', async ctx => {
        let data = { ...ctx.request.body }
        data.sex = Number(data.sex)
        data.age = data.age ? Number(data.age): null
        data.status = Number(data.status)
        data.uid = Number(await DB.count('user')) + 1// 这里需要修改
        let result = await DB.insert('user', data),
            res = {};
        if (result.result.ok >= 1) {
            res.code = 0
            res.data = null
            res.message = '添加用户成功'
        } else {
            res.code = -1
            res.data = null
            res.message = '添加用户失败'
        }
        ctx.body = res
    })

module.exports = router.routes()


/*
* 添加新用户
db.user.insert({
    uid: 4,
    username: 'dl',
    password: '6b502dff38b9258e8588ae545be1d40c61a7b39ee0761c357cdaefb3deb65153',
    realname: 'del',
    sex: 1,
    age: 29,
    phone: '+86 15855414491',
    email: '15855414491@163.com',
    role: '游戏管理员',
    status: 1
})
*/
// db.user.update( { "uid" : 2 } , { $set : { "phone" : "+86 18769567910"} } );
