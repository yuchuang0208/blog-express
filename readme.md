#Express-blog

#脚手架express-generator
    1. 全局安装：npm install express-generator -g
    2. expess 项目名 生成环境目录
    3. 进入目录npm install
    4. npm start 启动 默认port：3000

#脚手架安装的插件
    1. cookie-parser：解析cookie，str <---> json
    2. debug：调试
    3. express：框架
    4. http-errors：生成错误返回格式
    5. jade：html模板引擎
    6. morgan：自动生成日志

#手动安装插件
    1. cross-env：配置环境
    2. nodemon：测试环境下监测文件变化
    3. express-session：存储session
    4. connect-redis：session存储到redis
    5. mysql：数据库
    6. xss：防xss攻击

#中间件
    以函数的形式存在，连接在一起，形成一个异步队列，来完成对任何数据的预处理和后处理。
    app.use() app.get() app.post() 函数注册中间件
    ()