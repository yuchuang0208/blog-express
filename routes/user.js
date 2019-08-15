var express = require('express');
var router = express.Router();
let { login } = require('../controller/user')
let { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function(req, res, next) {
    let { username, password } = req.body
    let result = login(username, password)
    return result.then( data => {
        if ( data.username ) {
            req.session.username = data.username
            req.session.realname = data.realname
            console.log(req.session)
            res.json(new SuccessModel('登陆成功！'))
            return
        }else {
            res.json(new ErrorModel('登陆失败!'))
        }
    } )
});

router.get('/logout', (req, res, next) => {
    req.session.username = null
    res.json(new SuccessModel({logout:true},'退出成功！'))
})

router.get('/login-test', (req, res, next) => {
    if (req.session.username) {
        res.json({
            errno: 0,
            msg: 'login is ok'
        })
        return
    }else {
        res.json({
            errno: -1,
            msg: 'not login'
        })
    }
})


//测试session
// router.get('/session-test', (req, res, next) => {
//     let session = req.session
//     console.log(session)
//     if ( session.viewNum === null ) {
//         session.viewNum = 0
//     }
//     session.viewNum ++
//     res.json({
//         viewNum: session.viewNum
//     })
// });


module.exports = router;
