let crypto = require('crypto')
/*-------------binary md5------------------*/
let hmac1 = crypto.createHmac('md5', 'fremember')
hmac1.update(Buffer.from('fremember', 'binary'))
let encode1 = hmac1.digest('hex')
console.log(`binary data: ${encode1}`)

/*-------------string md5------------------*/
let hmac2 = crypto.createHmac('md5', 'fremember')
hmac2.update('fremember')
let encode2 = hmac2.digest('hex')
console.log(encode2)

/*-------------string md5------------------*/
let hmac3 = crypto.createHmac('sha1', 'fremember')
hmac3.update('fremember')
let encode3 = hmac3.digest('hex')
console.log(encode3)