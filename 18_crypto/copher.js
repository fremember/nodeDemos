let crypto = require('crypto'),
    key = 'salt_from',
    plaintext = 'fremember',
    cipher = crypto.createCipher('aes-256-cbc', key),
    decipher = crypto.createDecipher('aes-256-cbc', key);

    cipher.update(plaintext, 'utf8', 'hex')
    let enctytedPassword = cipher.final('hex')

    decipher.update(enctytedPassword, 'hex', 'utf8')
    let decryptefPassword = decipher.final('utf8')

    console.log(`encrypted: ${enctytedPassword}`)
    console.log(`decrypted: ${decryptefPassword}`)