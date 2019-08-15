let { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
    if ( req.session.username ) {
        next()
        return
    }
    res.json(
        new ErrorModel('未登陆')
    )
}

//登陆中间件