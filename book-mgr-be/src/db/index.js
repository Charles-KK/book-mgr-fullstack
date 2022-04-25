const mongoose = require("mongoose");
require('./Schemas/User')
require('./Schemas/InviteCode')
require('./Schemas/Book')
const connect = () => {
  return new Promise((resolve) => {
    // mongoose的connect方法 => 
    //协议：// db地址:27017 /db_name (若无对应db_name 将自动创建)
    mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
    //监听mongoose定义的'open'事件, 数据库成功启动将调用回调函数
    // 可以在回调内写当打开数据库时做什么事情
    mongoose.connection.on('open',() => {
      console.log('MongoDB连接成功');  
      resolve();
    })
  })
}

// 暴露connect接口
module.exports = {
  connect,
}