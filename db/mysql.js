//这里要返回执行sql语句的函数
const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

//创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

//链接
con.connect()

//执行mysql语句函数(异步)excute
function exec(sql) { 
    const promise = new Promise( (resolve, reject) => {
        //con.auery用来执行sql语句，回调返回结果
        con.query(sql, (err,result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        } )
    } )
    //返回一个Promise
    return promise
}

//(类似单立模式)创建一个链接，执行exec，不会多次创建，所以让他保留在内存中，不用断开连接，重复引用就可以了
// con.end()

module.exports = {
    exec,
    escape: mysql.escape //防止sql注入
}