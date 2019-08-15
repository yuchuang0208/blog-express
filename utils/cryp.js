//密码加密算法
const crypto = require('crypto') //node.js自带加密库

//密匙
const SECRET_KEY = 'YYuu/*-0208'

//MD5加密
function md5(content) { 
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex') //输出变成16进制
}

//加密函数返回加密后结果
function genPassword(password) { 
    let str = `password=${password}&key=${SECRET_KEY}`  //密码+密钥
    return md5(str)
}

module.exports = {
    genPassword
}