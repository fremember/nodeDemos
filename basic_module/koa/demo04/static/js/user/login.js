// 登录时，密码的明文和密文显示
$('.icon-view').click((evt) => {
    if($(evt.target).parent().find('input').attr('type') == 'password') {
        $(evt.target).parent().find('input').attr('type', 'text')
        $(evt.target).addClass('close-eye')
    } else {
        $(evt.target).parent().find('input').attr('type', 'password')
        $(evt.target).removeClass('close-eye')
    }
})
// 校验
function commonCheck () {
    let data = {}
    if($('.username').val()) {
        data.username = $('.username').val()
    } else {
        showMsg('用户名不能为空', 'warning', 2000)
    }
    if($('.password').val()) {
        data.password = sha256(`${$('.password').val()}${staticObjectState.privateKey}`)
    } else {
        showMsg('密码不能为空', 'warning', 2000)
    }
    if($('.imgcode').val()) {
        data.imgcode = $('.imgcode').val()
    } else {
        showMsg('图形验证码不能为空', 'warning', 2000)
    }
    return data
}
// 登录按钮
$('.login-btn').click(() => {
    let data = commonCheck()
    if(!data.username || !data.password || !data.imgcode) {
        return
    }
    $.post('/user/doLogin', data, (res) => {
        if(res.code == 0) {// 接口请求成功
            mineLS.setItem('token', res.data)
            mineLS.setItem('username', data.username)
            showMsg(res.message, 'success', 2000)
            setTimeout(() => {
                location.href = '/home/index'
            }, 2100)
        } else {// 接口请求失败
            showMsg(res.message, 'warning', 2000)
        }
    }, 'json')
})
function register_forget () {
    let data = commonCheck()
    if($('.conf-pwd').val()) {
        data.confirmPassword = sha256(`${$('.conf-pwd').val()}${staticObjectState.privateKey}`)
    } else {
        showMsg('确认密码不能为空', 'warning', 2000)
    }
    if(data.confirmPassword != data.password) {
        showMsg('两次密码输入的不一致', 'warning', 2000)
        return
    }
    return data
}
// 新用户注册
$('.register-reset').click((evt) => {
    let data = register_forget(),
        url = '';
    if(!data.username || !data.password || !data.imgcode || !data.confirmPassword) {
        return
    }
    delete data.confirmPassword
    url = $(evt.target).html() == '注册' ? '/user/register' : '/user/resetPwd'
    $.post(url, data, (res) => {
        if(res.code == 0) {
            showMsg(res.message, 'success', 2000)
            setTimeout(() => {
                location.href = '/user/login'
            }, 2100)
        } else {
            showMsg(res.message, 'warning', 2000)
        }
    }, 'json')
})