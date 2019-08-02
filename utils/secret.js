const crypto = require('crypto')

const {
  encryType,
  key
} = require('../config/config.default')

// 加密
exports.encry = function (data) {
  const cipher = crypto.createCipher(encryType, key)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

// 解密
exports.decry = function (data) {
  const decipher = crypto.createDecipher(encryType, key)
  let decrypted = decipher.update(data, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

// 测试
// console.log(this.encry('hello'))
// console.log(this.decry(this.encry('hello')))