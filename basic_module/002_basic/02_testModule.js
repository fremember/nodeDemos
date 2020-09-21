let circle = require('./02_module.js'),
    mineModule = require('mine_module'),
    readline = require('readline'),
    rl = readline.createInterface(
        process.stdin,
        process.stdout
    );
rl.question('please input radius is: ', (answer) => {
    /**
     * 验证exports使用
     */
    // console.log(circle.area(answer))
    // console.log(circle.circumference(answer))

    /**
     * 验证module.exports
     */
    //console.log(circle.area2(answer))

    /**
     * 验证node_modules里面自定义的模
     */
    console.log(mineModule.area2(answer))
    rl.close()
})