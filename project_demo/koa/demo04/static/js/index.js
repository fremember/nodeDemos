// 前缀或者后缀字段
window.staticObjectState = {
    privateKey: '###fremember_Pwd18760567910!@#$%^&*(){}?:"><~~',
    storagePrefix: 'fremember_koa_'
}
// 公共处理方法
window.mineLS = {// localStorage
    setItem: (key, value) => {
        localStorage.setItem(`${staticObjectState.storagePrefix}${key}`, value)
    },
    getItem: (key) => {
        return localStorage.getItem(`${staticObjectState.storagePrefix}${key}`)
    },
    removeItem: (key) => {
        localStorage.removeItem(`${staticObjectState.storagePrefix}${key}`)
    },
    clear: () => {
        localStorage.clear()
    }
}
window.mineSS = {// sessionStorage
    setItem: (key, value) => {
        sessionStorage.setItem(`${staticObjectState.storagePrefix}${key}`, value)
    },
    getItem: (key) => {
        return sessionStorage.getItem(`${staticObjectState.storagePrefix}${key}`)
    },
    removeItem: (key) => {
        sessionStorage.removeItem(`${staticObjectState.storagePrefix}${key}`)
    },
    clear: () => {
        sessionStorage.clear()
    }
}
window.showMsg = function (text, icon, hideAfter) {
    // if (heading == undefined) {
    //     var heading = "提示";
    // }
    $.toast({
        text: text,//消息提示框的内容。
        // heading: heading,//消息提示框的标题。
        icon: icon,//消息提示框的图标样式。
        showHideTransition: 'fade',//消息提示框的动画效果。可取值：plain，fade，slide。
        allowToastClose: true,//是否显示关闭按钮。(true 显示，false 不显示)
        hideAfter: hideAfter,//设置为false则消息提示框不自动关闭.设置为一个数值则在指定的毫秒之后自动关闭消息提框
        stack: 1,//消息栈。同时允许的提示框数量
        position: 'top-center',//消息提示框的位置：bottom-left, bottom-right,bottom-center,top-left,top-right,top-center,mid-center。
        textAlign: 'left',//文本对齐：left, right, center。
        loader: true,//是否显示加载条
        //bgColor: '#FF1356',//背景颜色。
        //textColor: '#eee',//文字颜色。
        loaderBg: '#ffffff',//加载条的背景颜色。
        // 会在toast即将出现之前触发
        beforeShow: function () {},
        // 会在toast出现后触发
        afterShown: function () {},
        // 会在toast藏起来之前触发
        beforeHide: function () {},
        // 会在toast藏起来后被触发
        afterHidden: function () {}
    })
}
window.username = mineLS.getItem('username')
document.querySelector('.username').innerHTML = window.username