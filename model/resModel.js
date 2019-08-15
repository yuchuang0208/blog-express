//建立模型，要求无论成功或失败都返回error来判断
class BaseModel {
    constructor( data, message ) {
        //兼容传递数据
        if ( typeof data === 'string' ) {//如果data为字符串的话，直接赋值message
            this.message = data
            data = null
            message = null
        }
        if ( data ) {
            this.data = data
        }
        if ( message ) {
            this.message = message
        }
    }
}

//继承BaseModel
class SuccessModel extends BaseModel {
    constructor( data, message ) {
        super(data,message)//执行一下父类函数
        this.errno = 0
    }
}

//继承BaseModel
class ErrorModel extends BaseModel {
    constructor( data,message ) {
        super(data,message)//执行一下父类函数
        this.errno = -1     
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}