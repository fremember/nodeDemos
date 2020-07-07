exports.getData = function (ctx) {
    // 获取数据 异步
    return new Promise((resolve, reject) => {
        try {
            let str = ''
            ctx.req.on('data', (dataChunk) => {
                str += dataChunk
            })
            ctx.req.on('end', () => {
                resolve(str)
            })
        } catch (err) {
            reject(err)
        }
    })
}