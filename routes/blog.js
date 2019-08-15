var express = require('express');
var router = express.Router();
let { getBlogList, getBlogShow, createBlog, updateBlog, deleteBlog } = require('../controller/blog')
let { SuccessModel, ErrorModel } = require('../model/resModel')
let loginCheck = require('../middleware/loginCheck')

router.get('/index', (req, res, next) => {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''

    if (req.query.isadmin) {
        //进入管理员界面
        if ( !req.session.username ) {
            res.json(
                new ErrorModel('未登陆')
            )
            return
        }
        author = req.session.username
    }

    //获取数据
    const result = getBlogList(author,keyword)
    return result.then( blogData => {
        res.json(
            new SuccessModel(blogData)
        )
    } )
});

router.get('/show', (req, res, next) => {
    let id = req.query.id || 0
    let result = getBlogShow(id)
    return result.then( data => {
        res.json(
            new SuccessModel(data)
        )
    } )
    
});

router.post('/create', loginCheck, (req, res, next) => {
    Object.assign(req.body, { author: req.session.username })
    let result = createBlog(req.body)
    return result.then( data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

router.post('/update',loginCheck, (req, res, next) => {
    let result = updateBlog(req.query.id, req.body)
    return result.then( data => {
        if (data) {
            res.json(
                new SuccessModel(data)
            )
        }else {
            res.json(
                new ErrorModel('更新失败')
            )
        }
        
    })
})

router.post('/delete', loginCheck, (req, res, next) => {
    let result = deleteBlog(req.query.id, req.session.username)
    return result.then( data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

module.exports = router;
