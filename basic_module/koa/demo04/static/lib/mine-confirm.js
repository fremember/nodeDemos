((factory) => {
    // 加载jquery
    if (typeof define === 'function' && define.amd) {// AMD
        define(['jquery'], factory)
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function(root, jQuery) {
            if(jQuery === undefined) {
                if(typeof window !== 'undefined') {
                    jQuery = require('jquery')
                } else {
                    jQuery = require('jquery')(root)
                }
            }
            factory(jQuery)
            return jQuery
        }
    } else {
        factory(jQuery)
    }
})(($) => {
    "use strict"
    $.confirm = (options) => {
        let mineConfirmConfig = {
            width: '500px', // 弹窗的宽度
            padding: '20px', // 弹窗的padding值
            showClose: true, // 是否显示关闭弹窗
            title: '提示', // 弹窗标题
            content: '这是一段内容', // 弹窗内容
            inputItem: false, // 是否在弹窗里面显示输入框
            placeholder: '请输入删除原因', // 在弹窗里面显示输入框时，输入框的默认水印
            buttons: {
                '确认': {
                    action: () => {}
                }
            },
            templateStart: '',
            templateCenter: '',
            templateEnd: ''
        },
        attrArr = [ 'width', 'padding', 'showClose', 'title', 'content', 'inputItem', 'placeholder', 'defaultButtons' ];
        // 格式化参数对象
        if (typeof options === 'undefined') {
            options = { ...mineConfirmConfig }
        } else if (typeof options === 'string') {
            let tempObj = { ...mineConfirmConfig, content: options }
            options = { ...tempObj }
        } else {
            attrArr.forEach(v => {
                if (!options[v]) {
                    options[v] = mineConfirmConfig[v]
                }
            })
        }
        if (!options.inputItem) {/* 无输入框的确认框 */
            mineConfirmConfig.templateStart += `<div class="mine-confirm-wrapper"><div class="mine-confirm-content" style="width: ${options.width}; padding: ${options.padding}"><div class="mine-confirm-title">${options.title}${options.showClose ? '<span mine-data="close"></span>' : ''}</div><div class="mine-confirm-cont">${options.content}</div><div class="mine-confirm-btns">`
        } else {/* 有输入框的确认框 */
            mineConfirmConfig.templateStart += `<div class="mine-confirm-wrapper"><div class="mine-confirm-content" style="width: ${options.width}; padding: ${options.padding}"><div class="mine-confirm-title">${options.title}${options.showClose ? '<span mine-data="close"></span>' : ''}</div><div><input class="mine-confirm-input" placeholder="${options.placeholder}" /></div><div class="mine-confirm-btns">`
        }
        Object.keys(options.buttons).forEach(v => {
            mineConfirmConfig.templateCenter += `<div class="query-btn ${v == '取消' ? 'query-btn-cancel' : 'query-btn-primary'}" mine-data="${v}">${v}</div>`
        })
        mineConfirmConfig.templateEnd = `</div></div></div>`

        $('body').append(`${mineConfirmConfig.templateStart}${mineConfirmConfig.templateCenter}${mineConfirmConfig.templateEnd}`)
        $('body .mine-confirm-wrapper').click((ev) => {
            let fnName = $(ev.target).attr('mine-data')
            if (fnName) {
                if (fnName !== 'close') {
                    if (options.inputItem) {
                        options.buttons[fnName]('.mine-confirm-wrapper', $('body .mine-confirm-input').val())
                    } else {
                        options.buttons[fnName]('.mine-confirm-wrapper')
                    }
                } else {
                    $(`body .mine-confirm-wrapper`).remove()
                }
            }
        })
    }
})