$(() => {
    // console.log(window.location.href)
    let userAddPanelStr = ''
    if (window.location.href.indexOf('?') > 0) {
        let uid = window.location.href.split('?')[1].split('=')[1]
        $.ajax({
            url: `/user/getUserItem/${uid}`,
            type: 'get',
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                'token': mineLS.getItem('token')
            },
            success: (res) => {
                if (res.code == 0) {
                    console.log(res)
                }
            }
        })
    } else {
        userAddPanelStr = `
            <li class="flex ai-c">
                <label class="label" for="username">用户名：</label>
                <div class="input-wrapper">
                    <input class="input username" id="username" mine-data="username" type="text" placeholder="请输入用户名" />
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="password">初始密码：</label>
                <div class="input-wrapper">
                    <input class="input password" id="password" mine-data="password" type="password" placeholder="请输入初始密码" />
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="realname">真实姓名：</label>
                <div class="input-wrapper">
                    <input class="input realname" id="realname" mine-data="realname" type="text" placeholder="请输入真实姓名" />
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="sex">性别：</label>
                <input class="radio sex" type="radio" name="sex" value="1" checked> 男
                <input class="radio sex" type="radio" name="sex" value="2"> 女
            </li>
            <li class="flex ai-c">
                <label class="label" for="age">年龄：</label>
                <div class="input-wrapper">
                    <input class="input age" id="age" mine-data="age" type="text" placeholder="请输入年龄" />
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="phone">手机号：</label>
                <div class="input-wrapper">
                    <input class="input phone" id="phone" mine-data="phone" type="text" placeholder="请输入手机号" />
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="email">邮箱：</label>
                <div class="input-wrapper">
                    <input class="input email" id="email" mine-data="email" type="text" placeholder="请输入邮箱" />
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="role">角色：</label>
                <input class="input role" id="role" mine-data="role" type="text" placeholder="请输入角色" />
            </li>
            <li class="flex ai-c">
                <label class="label" for="status">状态：</label>
                <input class="radio status" type="radio" name="status" value="1" checked> 开启
                <input class="radio status" type="radio" name="status" value="2"> 关闭
            </li>
            <li>
                <div class="query-btn query-btn-primary">确 认</div>
            </li>
        `
    }
    $('.user-add-panel').html(userAddPanelStr)

    $('.user-add-panel .query-btn-primary').click((ev) => {
        let inputStatus = true,
            addObj = {};
        if (!$('.user-add-panel .username').val()) {
            $('.user-add-panel .username').addClass('error')
            inputStatus = false
        } else {
            addObj.username = $('.user-add-panel .username').val()
        }
        if (!$('.user-add-panel .password').val()) {
            $('.user-add-panel .password').addClass('error')
            inputStatus = false
        } else {
            addObj.password = sha256(`${$('.user-add-panel .password').val()}${staticObjectState.privateKey}`)
        }
        if (!$('.user-add-panel .realname').val()) {
            $('.user-add-panel .realname').addClass('error')
            inputStatus = false
        } else {
            addObj.realname = $('.user-add-panel .realname').val()
        }
        if (!$('.user-add-panel .age').val()) {
            $('.user-add-panel .age').addClass('error')
            inputStatus = false
        } else {
            addObj.age = $('.user-add-panel .age').val()
        }
        if (!$('.user-add-panel .phone').val()) {
            $('.user-add-panel .phone').addClass('error')
            inputStatus = false
        } else {
            addObj.phone = $('.user-add-panel .phone').val()
        }
        if (!$('.user-add-panel .email').val()) {
            $('.user-add-panel .email').addClass('error')
            inputStatus = false
        } else {
            addObj.email = $('.user-add-panel .email').val()
        }
        if (!$('.user-add-panel .role').val()) {
            $('.user-add-panel .role').addClass('error')
            inputStatus = false
        } else {
            addObj.role = $('.user-add-panel .role').val()
        }
        addObj.sex = $('.user-add-panel .sex:radio:checked').val()
        addObj.status = $('.user-add-panel .status:radio:checked').val()
        if (inputStatus) {
            $.ajax({
                url: '/user/doAdd',
                type: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(addObj),
                headers: {
                    'token': mineLS.getItem('token')
                },
                success: (res) => {
                    if (res.code == 0) {
                        // 重置逻辑
                        $('.user-add-panel .username').val('')
                        $('.user-add-panel .realname').val('')
                        $('.user-add-panel .password').val('')
                        $('.user-add-panel .sex').eq(0).prop('checked', true)
                        $('.user-add-panel .status').eq(0).prop('checked', true)
                        $('.user-add-panel .age').val('')
                        $('.user-add-panel .phone').val('')
                        $('.user-add-panel .email').val('')
                        $('.user-add-panel .role').val('')
                        showMsg(res.message, 'success', 2000)
                    } else {
                        showMsg(res.message, 'warning', 2000)
                    }
                }
            })
        }
    })
    $('.user-add-panel input').focus((ev) => {// 获取焦点，删除错误的样式
        $(ev.target).removeClass('error')
    })
    function checkAjax (json, className) {
        // 验证用户名是否存在
        $.ajax({
            url: '/user/commonCheck',
            type: 'post',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(json),
            headers: {
                'token': mineLS.getItem('token')
            },
            success: (res) => {
                if (res.code != 0) {
                    showMsg(res.message, 'warning', 2000)
                    $(`.user-add-panel .${className}`).addClass('error')
                }
            }
        })
    }
    let commonCheck = { // 校验的具体方法
        username: () => {
            let _val = $('.user-add-panel .username').val()
            if(!_val) {
                $('.user-add-panel .username').addClass('error')
            } else {
                checkAjax({ "username": _val }, 'username')
            }
        },
        password: () => {
            let _val = $('.user-add-panel .password').val()
            if (!_val) {
                $('.user-add-panel .password').addClass('error')
            } else {// 密码各式校验
            }
        },
        realname: () => {
            let _val = $('.user-add-panel .realname').val()
            if (!_val) {
                $('.user-add-panel .realname').addClass('error')
            } else {
                checkAjax({ "realname": _val }, 'realname')
            }
        },
        email: () => {
            let _val = $('.user-add-panel .email').val()
            if (!_val) {
                $('.user-add-panel .email').addClass('error')
            } else {// 需要先做邮箱格式校验
                checkAjax({ "email": _val }, 'email')
            }
        },
        phone: () => {
            let _val = $('.user-add-panel .phone').val()
            if (!_val) {
                $('.user-add-panel .phone').addClass('error')
            } else { // 需要先做手机号格式校验
                checkAjax({ "phone": _val }, 'phone')
            }
        }
    }
    $('.user-add-panel input').blur((ev) => {// 校验逻辑
        if ($(ev.target).attr('mine-data') != 'age' && $(ev.target).attr('mine-data') != 'role') {
            commonCheck[$(ev.target).attr('mine-data')]()
        }
    })
})