$(() => {
    let tableStartStr = `<ul class="table-content">
                            <li class="flex tac ai-c">
                                <div class="flex_1">角色名称</div>
                                <div class="flex_18">角色描述</div>
                                <div class="flex_1">增加时间</div>
                                <div class="flex_1">最后修改时间</div>
                                <div class="flex_14">操作</div>
                            </li>
                        `,
        tableEndStr = '</ul>',
        tableContent = '',
        total = 0,
        searchJson = {
            pageSize: 10,
            pageNum: 1
        },
        ajaxProgressing = false;
    function initData(className, json) {
        if (!ajaxProgressing) {
            ajaxProgressing = true
            $.ajax({
                url: '/user/authlist',
                type: 'get',
                contentType: 'application/json',
                dataType: 'json',
                data: json,
                headers: {
                    'token': mineLS.getItem('token')
                },
                success: (res) => {
                    tableContent = ''
                    total = res.total
                    $.paging({
                        root: '.paging-wrapper',
                        width: '100%',
                        layout: 'number, total, sizes, jumper',
                        prevText: '上一页',
                        nextText: '下一页',
                        total: total,
                        pageNum: json.pageNum,
                        pageSize: json.pageSize,
                        pageSizes: [10, 20, 50, 100],
                        pagegroup: 5,
                        pageNumChange: (val) => {
                            json.pageNum = val
                            initData(className, json)
                        },
                        pageSizeChange: (val) => {
                            json.pageSize = val
                            initData(className, json)
                        }
                    })
                    if (res.code == 0) {
                        res.data.forEach(v => { // 初始化表格数据
                            tableContent += `<li class="flex tac ai-c">
                                    <div class="flex_1">${v.name ? v.name : '-'}</div>
                                    <div class="flex_18">${v.remark ? v.remark : '-'}</div>
                                    <div class="flex_1">${v.created ? v.created : '-'}</div>
                                    <div class="flex_1">${v.modified ? v.modified : '-'}</div>
                                    <div class="flex_14 flex ai-c jc-c">
                                        <a class="text-btn text-btn-primary" mine-data="${v._id}" mine-operate-type="${v.username == window.username ? 1 : 0}" href="/user/authAdd?uid=${v._id}">${v.username == window.username ? '编辑' : '详情'}</a>
                                        <span class="text-btn text-btn-error" mine-data="${v._id}">删除</span>
                                    </div>
                                </li>`
                        })
                        if (className) {
                            $(`body ${className}`).remove()
                        }
                        // 初始化整个表格
                        $('.table-panel .table-content').html(`${tableStartStr}${tableContent}${tableEndStr}`)
                    } else {
                        showMsg(res.message, 'warning', 2000)
                        window.location.href = '/user/login'
                    }
                    ajaxProgressing = false
                },
                error: (err) => {
                    console.log(err)
                    ajaxProgressing = false
                }
            })
        }
    }
    initData('', searchJson)
    $('.table-panel .table-content').on('click', (ev) => { // 删除
        let _id = $(ev.target).attr('mine-data'),
            _class = $(ev.target).attr('class');
        if (_id && _class.indexOf('text-btn-error') >= 0) {
            $.confirm({
                width: '500px', // 弹窗的宽度
                padding: '20px', // 弹窗的padding值
                showClose: true, // 是否显示关闭弹窗
                title: '删除确认', // 弹窗标题
                content: '您确认删除当前用户吗？', // 弹窗内容
                inputItem: false, // 是否在弹窗里面显示输入框
                placeholder: '请输入删除原因', // 在弹窗里面显示输入框时，输入框的默认水印
                buttons: { // 弹窗中的按钮
                    '确认': (className, res) => {
                        $.ajax({
                            url: `/user/deleteAuthItem/${_id}`,
                            type: 'get',
                            contentType: 'application/json',
                            dataType: 'json',
                            headers: {
                                'token': mineLS.getItem('token')
                            },
                            success: (res) => {
                                if (res.code == 0) {
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