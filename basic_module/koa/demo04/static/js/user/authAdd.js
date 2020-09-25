$(() => {
    let userAddPanelStr = '',
        data = [
            {
                "name": "所有权限123",
                "open": true,
                "checked": false,
                "id": 1,
                "children": [
                    {
                        "name": "储物柜管理",
                        "open": true,
                        "id": 2,
                        "checked": false,
                        "children": [
                            {
                                "name": "储物柜列表",
                                "id": 3,
                                "checked": false,
                                "open": false,
                                "children": [
                                    {
                                        "name": "详情",
                                        "id": 4,
                                        "checked": false
                                    },
                                    {
                                        "name": "修改价格",
                                        "id": 5,
                                        "checked": false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        arrs = [5];
    /**
     * 生成树结构
     * @param {*} data 树原型数组
     * @param {*} arrs 以选中的节点数组，元素是id
     */
    function createTree(data, arrs) {
        let _data, _arrs;
        if (arguments.length < 1) {
            showMsg('参数不能为空', 'warning', 2000)
            return
        } else if (arguments.length >= 1) {
            if (!Array.isArray(arguments[0])) {
                showMsg('参数类型不符', 'warning', 2000)
                return
            }
            _data = data
            if (arguments.length == 1) {
                _arrs = []
            } else if (arguments.length == 2) {
                if(typeof arrs == 'string') {
                    _arrs = arrs.split(',')
                } else {
                    _arrs = Array.from(new Set(arrs))
                }
            }
        }
        $('.tree-content').html(createChildren(_data, _arrs))
    }
    function createChildren (data, arrs) {
        let ulS = `<ul class="pad-l20px">`,
            ulC = ``,
            ulE = `</ul>`;
        data.forEach(v => {
            let liS = '',
                liC = '',
                liE = '</li>';
            /**
             * 需要做选中状态，切换显示内层的隐藏与显示
             */
            if (v.children && v.children.length > 0) {
                liS = `<li><p class="flex ai-c"><img class="minus-flag" src="/img/minus.png" alt=""><span class="like-checkbox" mine-data="${v.id}"></span><span>${v.name}</span></p>`
                liC += createChildren(v.children, arrs)
            } else {
                liS = `<li><p class="flex ai-c pad-l20px"><span class="like-checkbox" mine-data="${v.id}"></span><span>${v.name}</span></p>`
                liC = ''
            }
            ulC += `${liS}${liC}${liE}`
        })
        return `${ulS}${ulC}${ulE}`
    }
    createTree(data, arrs)
})