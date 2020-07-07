$(() => {
    let tableStartStr = `<ul class="table-content">
                            <li class="flex tac ai-c">
                                <div class="flex_1">UID</div>
                                <div class="flex_11">用户名</div>
                                <div class="flex_1">真实名字</div>
                                <div class="flex_1">性别</div>
                                <div class="flex_1">年龄</div>
                                <div class="flex_15">手机号</div>
                                <div class="flex_15">邮箱</div>
                                <div class="flex_1">角色</div>
                                <div class="flex_1">状态</div>
                                <div class="flex_14">操作</div>
                            </li>
                        `,
        tableEndStr = '</ul>',
        tableContent = '',
        searchJson = {
            pageSize: 10,
            pageNum: 1
        };
    function initData(className, json) {
        $.ajax({
            url: '/user/list',
            type: 'get',
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                'token': mineLS.getItem('token')
            },
            success: (res) => {
                tableContent = ''
                if(res.code == 0) {
                    res.data.forEach(v => { // 初始化表格数据
                        tableContent += `<li class="flex tac ai-c">
                                <div class="flex_1">${v.uid ? v.uid : '-'}</div>
                                <div class="flex_11">${v.username ? v.username : '-'}</div>
                                <div class="flex_1">${v.realname ? v.realname : '-'}</div>
                                <div class="flex_1">${v.sex == 1 ? '男' : '女'}</div>
                                <div class="flex_1">${v.age ? v.age : '-'}</div>
                                <div class="flex_15">${v.phone ? v.phone : '-'}</div>
                                <div class="flex_15">${v.email ? v.email : '-'}</div>
                                <div class="flex_1">${v.role ? v.role : '-'}</div>
                                <div class="flex_1 ${v.status == 1 ? 'status-open' : 'status-close'}">${v.status == 1 ? '开启' : '关闭'}</div>
                                <div class="flex_14 flex ai-c jc-c">
                                    <a class="text-btn text-btn-primary" mine-data="${v.uid}" mine-operate-type="${v.username == window.username ? 1 : 0}" href="/user/add?uid=${v.uid}">${v.username == window.username ? '编辑' : '详情'}</a>
                                    <span class="text-btn text-btn-error" mine-data="${v.uid}">删除</span>
                                </div>
                            </li>`
                    })
                    if(className) {
                        $(`body ${className}`).remove()
                    }
                    // 初始化整个表格
                    $('.table-panel').html(`${tableStartStr}${tableContent}${tableEndStr}`)
                }
            }
        })
    }
    initData('', searchJson)

    $('.search-btn').click(() => {// 查询
        if ($('.username').val()) {
            searchJson.username = $('.username').val()
        }
        if ($('.email').val()) {
            searchJson.email = $('.email').val()
        }
        if ($('.phone').val()) {
            searchJson.phone = $('.phone').val()
        }
        initData('', searchJson)
    })
    $('.table-panel .text-btn-primary').click((ev) => {// 编辑
        // console.log($(ev.target).attr('mine-data'))
        console.log($(ev.target).attr('mine-operate-type'))
        if ($(ev.target).attr('mine-operate-type') == 1) {// 编辑操作
        } else {// 查看详情操作
        }
    })
    $('.table-panel').click((ev) => {// 删除
        let uid = $(ev.target).attr('mine-data')
        if(uid) {
            $.confirm({
                width: '500px',// 弹窗的宽度
                padding: '20px',// 弹窗的padding值
                showClose: true,// 是否显示关闭弹窗
                title: '删除确认',// 弹窗标题
                content: '您确认删除当前用户吗？',// 弹窗内容
                inputItem: false,// 是否在弹窗里面显示输入框
                placeholder: '请输入删除原因', // 在弹窗里面显示输入框时，输入框的默认水印
                buttons: {// 弹窗中的按钮
                    '确认': (className, res) => {
                        // $.get(`/user/delleteItem/${uid}`, (res) => {
                        //     if(res.code == 0) {
                        //         initData(className, searchJson)
                        //     }
                        // }, 'json')
                        $.ajax({
                            url: `/user/delleteItem/${uid}`,
                            type: 'get',
                            contentType: 'application/json',
                            dataType: 'json',
                            headers: {
                                'token': mineLS.getItem('token')
                            },
                            success: (res) => {
                                if(res.code == 0) {
                                    initData(className, searchJson)
                                }
                            }
                        })
                    },
                    '取消': (className) => {
                        initData(className, searchJson)
                    }
                }
            })
        }
    })
})