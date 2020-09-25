/**
 * nodejs操作mongodb数据库
 * 1.安装mongodb
 *      cnpm install mongodb --save
 * 2.引入mongodb下面的MongoClient
 *      var MongoClient = require('mongodb').MongoClient;
 * 3.定义数据库连接的地址 以及配置数据库
 *  koa数据库的名称
 *      var url = 'mongodb://localhost:27017/';
 *      var dbName = 'koa'
 *  4.nodejs连接数据库
 *      MongoClient.connect(url,function(err,client){
 *          const db = client.db(dbName);  数据库db对象
 *      })
 * 5.操作数据库
 *   db.user.insert
 *      MongoClient.connect(url,function(err,db){
 *          db.collection('user').insertOne({"name":"张三"},function(err,result){
 *              db.close() //关闭连接
 *          })
 *      })
 */
let Koa = require('koa'),
    app = new Koa(),
    router = require('koa-router')(),
    render = require('koa-art-template'),
    bodyParser = require('koa-bodyparser'),
    DB = require('./module/db.js');

render(app, {
    root: `${__dirname}/artViews`,
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'  //是否开启调试模式
})

router
    .get('/', async (ctx) => {
        // console.time('start')// 注释的这两行可以得到该请求所用的时间
        let result = await DB.find('user', {})
        // console.timeEnd('start')
        await ctx.render('index2', {
            list: result
        })
    })
    .get('/add', async (ctx) => {
        await ctx.render('add')
    })
    .post('/doAdd', async (ctx) => {
        let { username, status } = ctx.request.body
            d = await DB.insert('user', { username: username, status: status * 1 });
        try {
            if(d.result.ok) {
                ctx.redirect('/')
            }
        } catch (err) {
            console.log(err)
            return
        }
    })
    .get('/delete', async (ctx) => {
        let id = ctx.query.id,
            result = await DB.remove('user', { "_id": DB.getObjectId(id) });
        if(result) {
            ctx.redirect('/')
        }
    })
    .get('/edit', async (ctx) => {
        let id = ctx.query.id
            result = await DB.find('user', { "_id": DB.getObjectId(id) });
        if(result) {
            ctx.render('edit', {
                list: result[0]
            })
        }
    })
    .post('/doEdit', async (ctx) => {
        let { id, username, status } = ctx.request.body,
            data = await DB.update('user', { "_id": DB.getObjectId(id) }, { username, status });
        try {
            if(data.result.ok) {
                ctx.redirect('/')
            }
        } catch (err) {
            console.log(err)
            return
        }
    })

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000)

