//引用处理请求函数
const { exec, escape } = require('../db/mysql')
//引用xss,防止xss攻击插件（输入js代码获取信息）
const xss = require('xss')

//获取列表
const getBlogList = ( author,keyword ) => {
    //定义一个sql查询语句
    //为什么写where 1=1,author和keyword没有值的时候where后直接拼order by，语法错误。注意语法中的空格
    //这里不能用const，这里会重新被赋值，语法报错
    let sql = `select * from blogs where 1=1 `
    if ( author ) {
        sql += `and author=${escape(author)} `
    }
    if ( keyword ) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc`
    console.log(sql)
    //返回一个Promise
    return exec(sql)
}

//获取详情
const getBlogShow = id => {
    id = escape(id)
    let sql = `select * from blogs where id=${id}`
    if ( id ) {
        //查询出来的是个数组，返回第一项
        return exec(sql).then( data => {
            return data[0]
        } )
    }
}

//添加
const createBlog = ( data = {} ) => {

    let title = xss(escape(data.title)) //（输入有特殊字符的时候转义）前端展示的时候要反转义一下
    let content = xss(escape(data.content))
    let author = escape(data.author)
    let createtime = escape(Date.now())

    let sql = `insert into blogs (title,content,author,createtime) values (${title},${content},${author},${createtime})`
    //返回新增的ID
    return exec(sql).then( createData => {
        // console.log(data)//返回新增的信息
        return {
            id: createData.insertId
        }
    } )
}

//修改
const updateBlog = ( id, data = {} ) => {
    id = escape(id)
    let sql = `update blogs set title=${escape(data.title)},content=${escape(data.content)} where id=${id}`
    return exec(sql).then( updateDate => {
        if ( updateDate.affectedRows > 0 ) {
            return {
                data: updateDate
            }
        }
        return false
    } )
}

//删除
const deleteBlog = (id, author) => {
    id = escape(id)
    author = escape(author)
    //删除的时候作者要匹配,保证只能删除自己的文章
    let sql = `delete from blogs where id=${id} and author=${author}`

    return exec(sql).then( deleteData => {
        if ( deleteData.affectedRows > 0 ) {
            return {
                data: deleteData
            }
        }
        return false
    } )
}

module.exports = {
    getBlogList,
    getBlogShow,
    createBlog,
    updateBlog,
    deleteBlog
}