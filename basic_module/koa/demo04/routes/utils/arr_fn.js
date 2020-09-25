class Arrfn {
    randomNumber (len) {
        let staticStr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',// 长度62
            resStr = '';
        for(let i = 0; i < len; i++) {
            let idx = Math.floor(Math.random() * staticStr.length)
            resStr += staticStr[idx]
        }
        return resStr
    }
}

module.exports = new Arrfn()