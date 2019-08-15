const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const login = ( username, password ) => {
    username = escape(username)

    //生成加密密码
    password = genPassword(password)

    //必须放加密后，要不报错单引号问题
    password = escape(password)

    let sql = `select username, realname from users where username=${username} and password=${password}`
    console.log('sql is', sql)
    return exec(sql).then( data => {
        //返回第一项或者空对象
        return data[0] || {}
    } )
}

module.exports = {
    login
}