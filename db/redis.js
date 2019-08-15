const redis = require('redis')  //connect-redis里依赖了redis
const { REDIS_CONF } = require('../config/db')

let redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('err', err => {
    console.log('redis-error', err)
})

module.exports = redisClient