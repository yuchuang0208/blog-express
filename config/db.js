//获取环境，线上还是测试(这个在package.json设置的)，根据不同环境配置不同的数据库,process存储的是进程信息
const env = process.env.NODE_ENV

//配置环境
let MYSQL_CONF
let REDIS_CONF

//测试环境
if (env === 'dev') {
    //mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'yu0208',
        port: '3306',
        database: 'blog'
    }
    //redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

//线上环境
if (env === 'production') {
    //mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'yu0208',
        port: '3306',
        database: 'blog'
    }
    //redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}