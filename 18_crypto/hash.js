let crypto = require('crypto')

/* -------------binary md5------------------ */
let hash1 = crypto.createHash('md5')
hash1.update(Buffer.from('fremember', 'binary'))
let encode1 = hash1.digest('hex')
console.log(`binary data: ${encode1}`)
/* -------------string md5------------------ */
let hash2 = crypto.createHash('md5')
hash2.update('fremember')
let encode2 = hash2.digest('hex')
console.log(`string data: ${encode2}`)
/* -------------string sha1------------------ */
let hash3 = crypto.createHash('sha1')
hash3.update('fremember')
let encode3 = hash3.digest('hex')
console.log(`string data: ${encode3}`)
