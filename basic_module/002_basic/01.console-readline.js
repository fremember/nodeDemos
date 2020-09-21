/**
 * 读取命令行输入的内容
 * 加载readline模块，并创建readline模块的对象，实用readline.createInterface()方法来实现
 * 并在改方法内定义好标准输入流和标准输出流。
 * 
 * readline.createInterface() 方法的语法如下
 * createInterface()方法创建一个readline模块的接口实例，并接受一个object对象作为参数
 * input: 要监听的可输入流（必需）
 * output: 要写入readline的可写流（ 必需）
 * completer: 用于Tab自动补全的可选函数
 * terminal: 如果希望input和output流像TTY（计算机终端设备）一样，那么通过传递参数true来实现，并且经由ANSI/VT100
 * 转码，默认情况下检查isTTY是否在output流上实例化
 */

/**
 * demo01 简单测试输入和获取
 */
/*
let readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.question('What is your name?', (answer) => {
    console.log(`My name is ${answer}`)
    rl.close()
})
rl.question('How old are you?', (answer) => {
    console.log(`I'm ${answer}`)
    rl.close()
})
*/
/**
 * demo02 阶乘运算输出
 * 主要用的是递归，递归结束条件是1，递归的表达式是：f(n) = n * f(n-1)
 */
/*
let iFactorial = 1, strFactorial,
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.question('请输入阶乘运算起始数值:', (iNum) => {
    strFactorial = `${iNum} != ${factorial(iNum)}`
    console.log(strFactorial)
    rl.close()
})
function factorial (n) {
    if(n > 0) {
        if(n == 1) {
            iFactorial = 1
        } else {
            iFactorial = n * factorial(n - 1)
        }
    }
    return iFactorial
}
*/

/**
 * 向控制台输出组合控制键
 * 在node.js平台下，通过readline模块的write()方法可以实现向控制台输出空间的功能
 */
/*
let readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.write('Delete me!Wait for 3 seconds…')
setTimeout(() => {
    rl.write(null, { ctrl: true, name: 'u' })
}, 3000);
*/

/**
 * 模拟一个简单的控制台洁面
 */
/*
let readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.setPrompt('NodeJS>')// 定义模块控制台命令行提示符
rl.prompt()// 初始化模拟控制台
rl.on('line', (line) => {// 激活readline模块的line事件
    switch (line.trim()) {
        case 'name':
            console.log('king!')
            break
        case 'code':
            console.log('Node.js!')
            break
        case 'time':
            console.log('2020')
            break
        default:
            console.log(`Say what?I might have heard ${line.trim()}`)
            break
    }
    rl.prompt()
}).on('close', () => {// 激活readline模块的close事件
    console.log('Have a great day!')
    process.exit(0)// 退出进程
})
*/

/**
 * 输出水仙花数
 * 水仙花数：就是一个三位自然数的百位、十位、个位数字的立方和
 */
/*
let m, a, b, c, sum;
for(m = 100; m < 1000; m++) {
    a = parseInt(m / 100)
    b = parseInt((m - a * 100) / 10)
    c = parseInt(m - a * 100 - b * 10)
    sum = Math.pow(a, 3) + Math.pow(b, 3) + Math.pow(c, 3)
    if(m == sum) {
        console.log('%d', m)
    }
}
*/

/**
 * 输出质数
 * 质数：就是一个整数，该整数只能被1和其自身整除
 * 只要循环判断比给定值小的数能被给定值整除即可
 */
/*
let i, j, strPrimeNum, bFlag,
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.question('Please enter number: ', (iNum) => {
    strPrimeNum = ' 2 '
    for(i = 3; i < iNum; i++) {
        bFlag = true
        for(j = 2; j < i; j++) {
            if(i % j == 0) {
                bFlag = false
                break
            }
        }
        if (bFlag) {
            strPrimeNum += i + ' '
        }
    }
    console.log(strPrimeNum)
})
*/

/**
 * 简单四则运算
 */
/*
let a, b, sign, summary,
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
rl.setPrompt('Calculate>')
rl.prompt()
a = Math.round(Math.random() * 100) // 随机生成100以内的整数
b = Math.round(Math.random() * 100) // 随机生成100以内的整数
sign = Math.round(Math.random() * 3) // 随机选取四则运算符
summary = switchSign(a, b, sign)
rl.on('line', (line) => {
    if (line.trim() === summary) {
        console.log('Answer is right!')
    } else {
        console.log(`Answer is error,The correct answer is ${summary}`)
    }
    rl.prompt()
    a = Math.round(Math.random() * 100) // 随机生成100以内的整数
    b = Math.round(Math.random() * 100) // 随机生成100以内的整数
    sign = Math.round(Math.random() * 3) // 随机选取四则运算符
    summary = switchSign(a, b, sign)
}).on('close', () => {
    console.log('Calculate exits!')
    process.exits(0)
})

function switchSign (a, b, sign) {
    let c;
    switch (sign) {
        case 0:
            c = a + b
            console.info(`${a} + ${b} = `)
            break
        case 1:
            c = a - b
            console.info(`${a} - ${b} = `)
            break
        case 2:
            c = a * b
            console.info(`${a} * ${b} = `)
            break
        case 3:
            c = a / b
            console.info(`${a} / ${b} = `)
            break
        default:
            c = a + b
            console.info(`${a} + ${b} = `)
            break
    }
    return c
}
*/