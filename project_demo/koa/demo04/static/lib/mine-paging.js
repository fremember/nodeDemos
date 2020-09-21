((factory) => {
    // 加载jquery
    if (typeof define === 'function' && define.amd) { // AMD
        define(['jquery'], factory)
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
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
    $.paging = (options) => {
        let mineConfirmConfig = {
            root: 'body',
            width: '100%',
            // layout: 'number, total, sizes, jumper',
            prevText: '<',
            nextText: '>',
            total: 0,
            pageNum: 1,
            pageSize: 10,
            pageSizes: [10, 20, 50, 100],
            pagegroup: 5,
            pageNumChange: (val) => {},
            pageSizeChange: (val) => {}
        }
        // 格式化参数对象
        if (typeof options === 'undefined') {
            options = { ...mineConfirmConfig }
        } else {
            Object.keys(mineConfirmConfig).forEach(attr => {
                if(!options[attr]) {
                    options[attr] = mineConfirmConfig[attr]
                }
            })
        }
        function createPageFn(options) {
            let numberDom = `<div class="mr20px number">当前显示${(options.pageNum - 1) * options.pageSize + 1}~${options.total < options.pageNum * options.pageSize ? options.total : options.pageNum * options.pageSize}条数据</div>`,
                totalDom = `<div class="total">共${options.total}条数据</div>`,
                leftDom = `<div class="paging-left">
                            ${options.layout.indexOf('number') >= 0 ? numberDom : ''}
                            ${options.layout.indexOf('total') >= 0 ? totalDom : ''}
                        </div>`,
                sizeOptionsItems = '',
                sizesDomS = `<div class="mr20px size">
                                <div class="div-input" mine-data="sizeWrapper">${options.pageSize} 条 / 页</div>
                                <ul class="size-options dn">`,
                sizeDomC = '',
                sizeDomE = `</ul></div>`,
                jumperDom = `<div class="ml20px jumper">前往<input class="pagenum" mine-data="pagenum" />页</div>`,
                pageListNumber = Math.ceil(options.total / options.pageSize),
                // pageListDomS = `<ul class="flex paging-list">${pageListNumber > options.pagegroup && options.pageNum != 1 ? '<li class="paging-item" mine-data="-1">' + options.prevText + '</li>' : ''}`,
                pageListDomS = `<ul class="flex paging-list"><li class="paging-item" mine-data="-1">${options.prevText}</li>`,
                pageListDomC = '',
                // pageListDomE = `${pageListNumber > 0 && options.pageNum != 1 ? '<li class="paging-item" mine-data="+1">' + options.nextText + '</li>' : '' }</ul>`,
                pageListDomE = `<li class="paging-item" mine-data="+1">${options.nextText}</li></ul>`,
                rightDom = '';
                if (options.pagegroup > pageListNumber) {
                    for (let i = 0; i < pageListNumber; i++) {
                        pageListDomC += `<li class="paging-item ${options.pageNum == i + 1 ? 'active' : ''}" mine-data="${i + 1}">${i + 1}</li>`
                    }
                } else {
                    var len = pageListNumber, temp = [], list = [], count = Math.floor(options.pagegroup / 2), center = Number(options.pageNum);
                    if (len <= options.pagegroup) {
                        while (len--) {
                            list.push(pageListNumber - len);
                        }
                    } else {
                        while (len--) {
                            temp.push(pageListNumber - len);
                        }
                        let idx = temp.indexOf(center);
                        (idx < count) && (center = center + count - idx);
                        (options.pageNum > pageListNumber - count) && (center = pageListNumber - count);
                        list = temp.splice(center - count - 1, options.pagegroup)
                        if (pageListNumber > options.pagegroup) {
                            (options.pageNum > count + 1) && (list.unshift(1, '...'));
                            (options.pageNum < pageListNumber - count) && (list.push('...', pageListNumber))
                        }
                    }
                    for (let i = 0; i < list.length; i++) {
                        pageListDomC += `<li class="paging-item ${options.pageNum == list[i] ? 'active' : ''}" mine-data="${list[i] == '...' ? '+1' : list[i]}">${list[i]}</li>`
                    }
                }
                options.pageSizes.forEach(v => {
                    sizeDomC += `<li class="size-item ${v == options.pageSize ? 'active' : ''}" mine-data="sizeitem-${v}">${v} 条 / 页</li>`
                })
                rightDom = `<div class="flex ai-c paging-right">
                            ${options.layout.indexOf('sizes') >= 0 ? sizesDomS + sizeDomC + sizeDomE : ''}
                            ${pageListDomS}${pageListDomC}${pageListDomE}
                            ${options.layout.indexOf('jumper') >= 0 ? jumperDom : ''}
                        </div>`
            
            $(`${options.root}`).html(`${leftDom}${rightDom}`)
            $('.paging-wrapper .paging-right .jumper .pagenum').val(options.pageNum)
        }
        createPageFn(options)
        $('.paging-wrapper').click((ev) => {
            let mineData = $(ev.target).attr('mine-data'),
                pageListNumber = Math.ceil(options.total / options.pageSize);
            
            if (mineData != 'pagenum') {
                if (mineData && mineData.indexOf('size') < 0) {// 页码的改变
                    switch (mineData) {
                        case '-1':
                            if (options.pageNum > 1) {
                                options.pageNum -= 1
                                createPageFn(options)
                            }
                            break
                        case '+1':
                            if (options.pageNum < pageListNumber) {
                                options.pageNum += 1
                                createPageFn(options)
                            }
                            break
                        default:
                            options.pageNum = Number(mineData)
                            createPageFn(options)
                            break
                    }
                    options.pageNumChange(options.pageNum)
                }
                if (mineData) {// 页面显示条数的改变
                    if (mineData == 'sizeWrapper') {// 显示下拉框选项
                        $('.paging-wrapper .paging-right .size .size-options').removeClass('dn')
                    }
                    if (mineData.indexOf('sizeitem') >= 0) {// 选项
                        let _pageSize = mineData.split('-')[1]
                        $('.paging-wrapper .paging-right .size .div-input').html(`${_pageSize} 条 / 页`)
                        $('.paging-wrapper .paging-right .size .size-options').addClass('dn')
                        options.pageSize = Number(_pageSize)
                        createPageFn(options)
                        options.pageSizeChange(options.pageSize)
                    }
                }
            }
        })
        $('.paging-wrapper .paging-right .jumper .pagenum').on('keyup', (ev) => {
            if (ev.keyCode == 13) {
                options.pageNum = Number($(ev.target).val())
                createPageFn(options)
                options.pageNumChange(options.pageNum)
            }
        })
    }
})