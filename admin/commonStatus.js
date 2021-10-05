/*
 * @Author: fremember
 * @Date: 2021-09-25 17:16:00
 * @Description: 公共状态码
 */
/**
 * 10开头说明是数据异常
 * 20开头表示用户输入错误
 * 30开头表示插入失败
 */
module.exports = {
    code_1: { code: 101, msg: '用户名已存在' },
    code_2: { code: 201, msg: '验证码错误' },
    code_3: { code: 301, msg: '注册失败' },
    code_4: { code: 302, msg: '密码修改失败' },
    code_5: { code: 102, msg: '登录失败' },
    code_6: { code: 103, msg: '用户名不存在' },
    code_7: { code: 104, msg: '密码输入错误' },
    code_8: { code: 302, msg: '退出失败' },
    code_9: { code: 105, msg: '前端路由查询失败' }
}