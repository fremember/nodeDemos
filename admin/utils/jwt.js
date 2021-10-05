/*
 * @Author: fremember
 * @Date: 2021-09-15 10:29:24
 * @Description: 
 */
let fs = require('fs'),
	path = require('path'),
	jwt = require('jsonwebtoken');

/**
 * 创建token类
 */
class Jwt {
	constructor (data) {
		this.data = data;
	}
	/**
	 * 生成token
	 */
	generateToken () {
		let data = this.data,
			created = Math.floor(Date.now() / 1000),
			cert = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem')),
			token = jwt.sign({
				data,
				exp: created + 60 * 30
			}, cert, { algorithm: 'RS256' });
		return token;
	}
	/**
	 * 校验token
	 */
	verifyToken () {
		let token = this.data,
			cert = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem')),
			res;
		try {
			let result = jwt.verify(token, cert, { algorithm: ['RS256'] }) || {},
				{ exp = 0 } = result,
				current = Math.floor(Date.now() / 1000);
			if(current < exp) {
				res = result.data || {};
			}
		} catch (e) {
			res = 'err'
		}
		return res
	}
	/**
	 * 解析token到id值
	 */
	decodeToken () {
		let token = this.data,
			result = jwt.decode(token);
		return result.data || ''
	}
}
module.exports = Jwt;