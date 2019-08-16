var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let session = require('express-session');
let RedisStore = require('connect-redis')(session)
var logger = require('morgan');

// var indexRouter = require('./routes/index');                //路由
// var usersRouter = require('./routes/users');
let blogRouter = require('./routes/blog');                  //注册博客路由
let userRouter = require('./routes/user');                  //注册用户路由

var app = express();                                        //初始化app实例

// view engine setup
app.set('views', path.join(__dirname, 'views'));            //注册视图引擎
app.set('view engine', 'jade');

app.use(logger('dev'));                                      //自动生成日志
app.use(express.json());                                     //处理post请求，在路由中就可以通过req.body获取json格式数据
app.use(express.urlencoded({ extended: false }));            //处理post请求，兼容提交json格式，form表单等格式
app.use(cookieParser());                                     //解析cookie，在路由中就可以通过req.cookie获取cookie
let redisClient = require('./db/redis')                      //接收redis连接配置对象
let sessionStore = new RedisStore({                          //redis的构造函数
    client: redisClient
})
app.use(session({                                            //解析完cookie后设置session
    resave: false,                                           //重新保存：强制会话保存即使是未修改的。
    saveUninitialized: true,                                 //强制“未初始化”的会话保存到存储。
    secret: 'Yu/*-0208',                                     //secret:加密
    cookie: {                                                //cookie设置根路径、前端不可改、过期时间等
        path: '/',           
        httpOnly: true,
        maxAge: 24*60*60*1000,
    },
    store: sessionStore                                      //session存储到redis中
}));  

app.use(express.static(path.join(__dirname, 'public')));     //注册静态文件地址

// app.use('/', indexRouter);                                   //处理路由
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);                                //处理博客路由设置根路由
app.use('/api/user', userRouter);                                //处理用户路由设置根路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {                           //访问一个错误的路由进行友好的提示
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {                      //处理错误抛出
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {}; //区分环境

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
