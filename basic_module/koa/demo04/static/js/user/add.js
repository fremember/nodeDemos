$(() => {
    // console.log(window.location.href)
    let userAddPanelStr = '',
        countryListsStr = '',
        yearListsStr = '',
        monthListsStr = '',
        dateListsStr = '',
        countryText = '+86',
        uid = '';
    /**
     * 生成国标码的列表
     * @param {*} val 默认需要高亮的国标码
     * @return null 无返回值
     */
    function createCountryListStr (val) {
        countryListsStr = ''
        window.countryLists.forEach(v => {
            countryListsStr += `<li class="${v.indexOf(val) > 0 ? 'active' : ''}">${v}</li>`
        })
    }
    /**
     * 生成时间的选择框-年
     * @param {*} val 默认需要高亮的年
     * @return null 无返回值
     */
    function createYear (val) {
        let _curData = new Date(),
            _curYear = _curData.getFullYear();
        // for(let i = 0; i < 20; i++) {
        //     yearListsStr += `<li class="${_curYear - i == val ? 'active' : ''}">${_curYear - i}</li>`
        // }
        yearListsStr = ''
        for (let i = _curYear; i >= 1985; i--) {
            yearListsStr += `<li class="${i == val ? 'active' : ''}">${i}</li>`
        }
    }
    /**
     * 生成时间的选择框-月
     * @param {*} val 默认需要高亮的月
     * @return null 无返回值
     */
    function createMonth(val) {
        monthListsStr = ''
        for (let i = 1; i <= 12; i++) {
            monthListsStr += `<li class="${val == i ? 'active' : ''}">${i < 10 ? '0' + i : i}</li>`
        }
    }
    /**
     * 判断是不是闰年
     * 闰年能被4整除且不能被100整除， 或能被400整除
     * 
     */
    function isLeapYear(year) {
        if((year % 4 == 0 && year % 100 != 0 && !year) || (year % 400 == 0)) {
            return true
        } else {
            return false
        }
    }
    /**
     * 生成时间的选择框-日
     * @param {*} _curYear 年份
     * @param {*} _curMonth 月份
     * @param {*} val 默认需要高亮的日
     * @return null 无返回值
     */
    function createDate(_curYear, _curMonth, val) {
        let dateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (isLeapYear(Number(_curYear))) {
            dateList[1] = 29
        } else {
            dateList[1] = 28
        }
        dateListsStr = ''
        for (let i = 1; i <= dateList[Number(_curMonth) - 1]; i++) {
            dateListsStr += `<li class="${val == i ? 'active' : ''}">${i < 10 ? '0' + i : i}</li>`
        }
    }

    /**
     * 公共设置
     * @param {*} attr 类名，用于获取元素
     * @param {*} val 设置的值
     * @return void 无返回值
     */
    function commonSetInput (attr, val) {
        $(`.user-add-panel .input-wrapper ${attr}`).text(val)
    }
    /**
     * 切换国标码列表的显示和隐藏
     */
    function countryToggleClass (attr) {
        $(`.user-add-panel .input-wrapper ${attr}`).toggleClass('dn')
    }
    /**
     * 初始化时间
     * @param {*} date 时间格式的值
     * @return void 无返回值
     */
    function resetDate(date) {
        let curData = null
        if (date) {
            curData = new Date(date)
        } else {
            curData = new Date()
        }
        let curYear = curData.getFullYear(),
            curMonth = curData.getMonth() + 1 < 10 ? '0' + (curData.getMonth() + 1) : curData.getMonth() + 1,
            curDate = curData.getDate() < 10 ? '0' + curData.getDate() : curData.getDate();
        commonSetInput('.birthday-wrapper .year', curYear)
        commonSetInput('.birthday-wrapper .month', curMonth)
        commonSetInput('.birthday-wrapper .date', curDate)
    }
    /**
     * 隐藏元素
     */
    function addClassNameDN (str) {
        let _arr = str.split('###')
        _arr.forEach(v => {
            $(`.user-add-panel .input-wrapper .${v}`).addClass('dn')
        })
    }

    function createForm () {
        let _curData = new Date(),
            _curYear = _curData.getFullYear(),
            _curMonth = _curData.getMonth() + 1 < 10 ? `0${_curData.getMonth() + 1}` : _curData.getMonth() + 1,
            _curDate = _curData.getDate() < 10 ? `0${_curData.getDate()}` : _curData.getDate();
        createCountryListStr(countryText)
        createYear(_curYear)
        createMonth(_curMonth)
        createDate(_curYear, _curMonth, _curDate)
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
                <label class="label" for="year">生日：</label>
                <div class="flex ai-c input-wrapper">
                    <div class="pos-r birthday-wrapper">
                        <div class="flex ai-c year-wrapper">
                            <div class="div-input year" mine-data="year"></div>
                            年
                        </div>
                        <ul class="pos-a year-list birthday-list dn">
                            ${yearListsStr}
                        </ul>
                    </div>
                    <div class="pos-r birthday-wrapper">
                        <div class="flex ai-c month-wrapper">
                            <div class="div-input month" mine-data="month"></div>
                            月
                        </div>
                        <ul class="pos-a month-list birthday-list dn">
                            ${monthListsStr}
                        </ul>
                    </div>
                    <div class="pos-r birthday-wrapper">
                        <div class="flex ai-c date-wrapper">
                            <div class="div-input date" mine-data="date"></div>
                            日
                        </div>
                        <ul class="pos-a date-list birthday-list dn">
                            
                        </ul>
                    </div>
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="age">年龄：</label>
                <div class="input-wrapper">
                    <input class="input age" id="age" mine-data="age" type="text" placeholder="请输入年龄" />
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="phone">手机号：</label>
                <div class="flex ai-c input-wrapper">
                    <div class="pos-r country-wrapper">
                        <div class="div-input country" mine-data="country"></div>
                        <ul class="pos-a country-list dn">
                            ${countryListsStr}
                        </ul>
                    </div>
                    <div class="flex_1 phone-wrapper">
                        <input class="input phone" id="phone" mine-data="phone" type="text" placeholder="请输入手机号" />
                    </div>
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
                <div class="input-wrapper">
                    <input class="input role" id="role" mine-data="role" type="text" placeholder="请输入角色" />
                </div>
            </li>
            <li class="flex ai-c">
                <label class="label" for="status">状态：</label>
                <input class="radio status" type="radio" name="status" value="1" checked> 开启
                <input class="radio status" type="radio" name="status" value="2"> 关闭
            </li>
            <li class="pl100px">
                <div class="query-btn query-btn-primary">确 认</div>
            </li>
        `
    }
    createForm()
    $('.user-add-panel .input-wrapper .date-list').html(`${dateListsStr}`)
    /**
     * 将生成的表单放入父元素中
     */
    $('.user-add-panel').html(userAddPanelStr)
    commonSetInput('.country-wrapper .country', countryText)
    resetDate()

    /**
     * 生成添加用户的form表单
     */
    if (window.location.href.indexOf('?') > 0) {
        uid = window.location.href.split('?')[1].split('=')[1]
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
                    $('.user-add-panel .username').val(res.data.username)
                    $('.user-add-panel .realname').val(res.data.realname)
                    $('.user-add-panel .sex').eq(res.data.sex == 1 ? 0 : 1).prop('checked', true)
                    $('.user-add-panel .status').eq(res.data.status == 1 ? 0 : 1).prop('checked', true)
                    $('.user-add-panel .age').val(res.data.age)
                    let _phoneArr = res.data.phone.split(' ')
                    resetDate(res.data.birthday)
                    $('.user-add-panel .country').val(_phoneArr[0])
                    $('.user-add-panel .phone').val(_phoneArr[1])
                    $('.user-add-panel .email').val(res.data.email)
                    $('.user-add-panel .role').val(res.data.role)
                }
            }
        })
    }
    
    


    /**
     * 确认按钮的点击事件
     */
    $('.user-add-panel .query-btn-primary').on('click', (ev) => {
        let addObj = {
                inputStatusArr: new Array(7).fill(true)
            },
            url = '';
        Object.keys(commonCheck).forEach(attr => {
            commonCheck[attr](0, addObj)
        })
        if (!$('.user-add-panel .role').val()) {
            $('.user-add-panel .role').addClass('error')
            addObj.inputStatusArr[6] = false
        } else {
            addObj.role = $('.user-add-panel .role').val()
            addObj.inputStatusArr[6] = true
        }
        addObj.sex = $('.user-add-panel .sex:radio:checked').val()
        addObj.status = $('.user-add-panel .status:radio:checked').val()
        addObj.birthday = `${$('.user-add-panel .input-wrapper .year-wrapper .year').html()}-${$('.user-add-panel .input-wrapper .month-wrapper .month').html()}-${$('.user-add-panel .input-wrapper .date-wrapper .date').html()}`
        
        if (uid == '') {
            url = '/user/doAdd'
        } else {
            addObj.uid = uid
            url = '/user/doUpdate'
        }
        if (addObj.inputStatusArr.every(v => { return v })) {
            delete addObj.inputStatusArr
            $.ajax({
                url: url,
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
                        $('.user-add-panel .country').val('+86')
                        $('.user-add-panel .phone').val('')
                        $('.user-add-panel .email').val('')
                        $('.user-add-panel .role').val('')
                        showMsg(res.message, 'success', 2000)
                    } else {
                        showMsg(res.message, 'warning', 2000)
                    }
                }
            })
        } else {
            showMsg('输入信息有误，请确认后提交', 'warning', 2000)
        }
    })
    $('.user-add-panel input').on('focus', (ev) => {// 获取焦点，删除错误的样式
        $(ev.target).removeClass('error')
    })
    /**
     * 接口校验唯一性
     * @param {*} json 校验的字段名和对应的值
     * @param {*} className 元素类名称，用于校验失败后标记错误信息
     * @return null 无返回值
     */
    function checkAjax(json, className) { // 
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
        username: (index, obj) => {
            let _val = $('.user-add-panel .username').val()
            if(!_val) {
                if (index == 0) {
                    obj.inputStatusArr[0] = false
                }
                $('.user-add-panel .username').addClass('error')
            } else {
                if(index == 1) {
                    checkAjax({ "username": _val }, 'username')
                } else {
                    obj.inputStatusArr[0] = true
                    obj.username = _val
                }
            }
        },
        password: (index, obj) => {
            let _val = $('.user-add-panel .password').val();
            if (!_val) {
                if (index == 0) {
                    obj.inputStatusArr[1] = false
                }
                $('.user-add-panel .password').addClass('error')
            } else {
                if (!/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?`,./\\\+\-]+)$)^[\w~!@#$%^&*?`,./\\\+\-]{8,20}$/.test(_val)) {
                    showMsg('密码必须由数字+字母+特殊字符三选二组合，长度介于8-20位', 'warning', 2000)
                    $('.user-add-panel .password').addClass('error')
                } else {
                    if (index == 0) {
                        obj.inputStatusArr[1] = true
                        obj.password = sha256(`${_val}${staticObjectState.privateKey}`)
                    }
                }
            }
        },
        realname: (index, obj) => {
            let _val = $('.user-add-panel .realname').val()
            if (!_val) {
                $('.user-add-panel .realname').addClass('error')
                if (index == 0) {
                    obj.inputStatusArr[2] = false
                }
            } else {
                if(index == 1) {
                    checkAjax({ "realname": _val }, 'realname')
                } else {
                    obj.inputStatusArr[2] = true
                    obj.realname = _val
                }
            }
        },
        age: (index, obj) => {
            let _val = $('.user-add-panel .age').val();
            
            if ((!_val) || (_val && (_val <= 0 || _val > 143))) {
                $('.user-add-panel .age').addClass('error')
                if(index == 0) {
                    obj.inputStatusArr[3] = false
                }
            } else {
                if(index == 0) {
                    obj.age = _val
                    obj.inputStatusArr[3] = true
                }
            }
        },
        email: (index, obj) => {
            let _val = $('.user-add-panel .email').val()
            if (!_val) {
                if(index == 0) {
                    obj.inputStatusArr[5] = false
                }
                $('.user-add-panel .email').addClass('error')
            } else {
                if (_val && !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(_val)) {
                    showMsg('邮箱格式不正确', 'warning', 2000)
                    $('.user-add-panel .email').addClass('error')
                    if (index == 0) {
                        obj.inputStatusArr[5] = false
                    }
                } else {
                    if(index == 1) {
                        checkAjax({ "email": _val }, 'email')
                    } else {
                        obj.inputStatusArr[5] = true
                        obj.email = _val
                    }
                }
            }
        },
        phone: (index, obj) => {
            let _phone = $('.user-add-panel .phone').val(),
                _country = $('.user-add-panel .input-wrapper .country-wrapper .country').text();
            if (!_phone) {
                if(index == 0) {
                    obj.inputStatusArr[4] = false
                }
                $('.user-add-panel .phone').addClass('error')
            } else { // 需要先做手机号格式校验
                if ((_country == '+86' && !(/^1[3456789]\d{9}$/.test(_phone))) || (_country != '+86' && !/^[0-9]*$/.test(_phone))) {
                    showMsg('手机号格式不正确', 'warning', 2000)
                    $('.user-add-panel .phone').addClass('error')
                    if (index == 0) {
                        obj.inputStatusArr[4] = false
                    }
                } else {
                    if(index == 1) {
                        checkAjax({ "phone": `${_country} ${_phone}` }, 'phone')
                    } else {
                        obj.inputStatusArr[4] = true
                        obj.phone = `${_country} ${_phone}`
                    }
                }
            }
        }
    }
    $('.user-add-panel input').on('blur', (ev) => {// 校验逻辑
        if ($(ev.target).attr('mine-data') != 'role' && $(ev.target).attr('mine-data') != 'country') {
            commonCheck[$(ev.target).attr('mine-data')](1)
        }
    })
    /**
     * 点击国标码元素事件
     */
    $('.user-add-panel .input-wrapper .country-list li').on('click', (ev) => {
        let textStr = $(ev.target).html(),
            textArr = textStr.split(' '),
            _phone = $('.user-add-panel .phone').val();
        $('.user-add-panel .input-wrapper .country-list li').removeClass('active')
        $(ev.target).toggleClass('active')
        commonSetInput('.country-wrapper .country', textArr[1])
        
        countryToggleClass('.country-list')
        if (_phone) {
            commonCheck.phone()
        }
    })
    
    /**
     * 切换类名
     * @param {*} str 需要隐藏元素的类名字符串
     * @param {*} className 切换显示的元素
     */
    function toggleAndDN (str, className) {
        addClassNameDN(str)
        countryToggleClass(className)
    }
    /**
     * 国标码输入框点击事件
     */
    $('.user-add-panel .input-wrapper .country-wrapper .country').on('click', (ev) => {
        toggleAndDN('year-list###month-list###date-list', '.country-list')
    })
    /**
     * 生日-年、月、日 点击事件
     */
    $('.user-add-panel .input-wrapper .birthday-wrapper .div-input').on('click', (ev) => {
        let _mineData = $(ev.target).attr('mine-data')
        switch (_mineData) {
            case 'year':
                toggleAndDN('country-list###month-list###date-list', '.year-list')
                break
            case 'month':
                toggleAndDN('country-list###year-list###date-list', '.month-list')
                break
            case 'date':
                toggleAndDN('country-list###year-list###month-list', '.date-list')
                let _curYear = $('.user-add-panel .input-wrapper .year-wrapper .year').html(),
                    _curMonth = $('.user-add-panel .input-wrapper .month-wrapper .month').html(),
                    _curDate = $('.user-add-panel .input-wrapper .date-wrapper .date').html();
                createDate(_curYear, _curMonth, _curDate)
                $('.user-add-panel .input-wrapper .date-list').html(`${dateListsStr}`)
                break
        }
    })
    /**
     * 生日-年、月、日列表元素点击事件
     */
    $('.user-add-panel .input-wrapper .birthday-list li').on('click', (ev) => {
        let _classStr = $(ev.target).parent().attr('class'),
            _val = $(ev.target).text();
        // 年
        if (_classStr.indexOf('year-list') >= 0) {
            addClassNameDN('birthday-list')
            $('.user-add-panel .input-wrapper .year-wrapper .year').html(_val)
            createDate(_val, $('.user-add-panel .input-wrapper .month-wrapper .month').html() - 1, $('.user-add-panel .input-wrapper .date-wrapper .date').html())
            $('.user-add-panel .input-wrapper .date-list').html(`${dateListsStr}`)
        }
        // 月
        if (_classStr.indexOf('month-list') >= 0) {
            addClassNameDN('month-list')
            $('.user-add-panel .input-wrapper .month-wrapper .month').html(_val)
            createDate($('.user-add-panel .input-wrapper .year-wrapper .year').html(), _val - 1, $('.user-add-panel .input-wrapper .date-wrapper .date').html())
            $('.user-add-panel .input-wrapper .date-list').html(`${dateListsStr}`)
        }
        // 日
        if (_classStr.indexOf('date-list') >= 0) {
            addClassNameDN('date-list')
            $('.user-add-panel .input-wrapper .date-wrapper .date').html(_val)
        }
    })
})