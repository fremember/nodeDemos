/**
 * 根据路由对象和模块名称生成二级路由
 * @param menuObj Object 路由对象
 * @param _module String 模块名称
 * @return String 二级路由组成的元素字符串
 */
function createSubMenu(menuObj, _module, url) {
    let _menuItem = ''
    menuObj[_module].children.forEach(v => {
        _menuItem += `<li class="menu-item" mine-data="${v.key}">
                            <a href="${v.url}" class="${url == v.url ? 'active' : ''}">${v.title}</a>
                        </li>`
    })
    if (window.location.pathname != url) {
        window.location.href = url
    }
    return _menuItem
}
$(() => {
    let menuObj = {
        product: {
            title: '商品管理',
            children: [
                { key: 'p-list', title: '商品列表', url: '/product/index' }
            ]
        },
        user: {
            title: '用户管理',
            children: [
                { key: 'u-list', title: '用户列表', url: '/user/index' },
                { key: 'u-add', title: '新增用户', url: '/user/add' },
                { key: 'u-authority', title: '权限管理', url: '/user/authority' }
            ]
        },
        self: {
            title: '个人中心',
            children: [
                { key: 's-index', title: '个人资料', url: '/self/profile' },
                { key: 's-tab', title: '我的标签', url: '/self/tabList' },
                { key: 's-article', title: '我的博客', url: '/self/article' },
                { key: 's-question', title: '我的问答', url: '/self/question' }
            ]
        }
    },
    menuCont = '',
    // 展开路由
    pathname = window.location.pathname,
    arr = pathname.split('/');
    for (let [key, value] of Object.entries(menuObj)) {// 添加一级路由
        menuCont += `<li>
                        <div class="menu-title ${arr[1] == key ? 'active' : ''}" mine-data="${key}">${value.title}</div>
                        <ol class = "menu-cont ${arr[1] == key ? '' : 'dn'} menu-${key}">${createSubMenu(menuObj, key, pathname)}</ol>
                    </li>`
    }
    $('.menu-wrapper').html(menuCont)
    $('.menu-wrapper .menu-title').click((ev) => { // 添加二级路由
        let _module = $(ev.target).attr('mine-data'),
            _className = `menu-${_module}`,
            _menuItem = createSubMenu(menuObj, _module, menuObj[_module].children[0].url);
        $('.menu-wrapper .menu-title').removeClass('active')
        $(ev.target).addClass('active')
        $('.menu-wrapper li ol').addClass('dn')
        $(`.menu-wrapper .${_className}`).html(_menuItem).removeClass('dn')
    })
})