// mongoose是node 操作 MongoDB 的库，因此需要引入依赖

const mongoose = require('mongoose');



//区分MongoDB中 Schema 和 modal 
// 先创建Schema，Schema对象用于描述文档。结构将与数据库内文档结构一致。mongoose会将Schema映射到集合
const UserSchema = new mongoose.Schema({
      nickname: String,
      password: String,
      age: Number
  })

//modal是根据Schema创建的一套方法，用于操作MongoDB集合及集合下的文档
//modal的名字 ’User‘ 加上s 作为集合的名字
const UserModal = mongoose.model('User', UserSchema);

//连接数据库的方法。
// 确保数据库已经提前打开了。 在安装目录 通过命令 mongod --dbpath my_db_path启动
const connect= () => {
  // mongoose的connect方法 => 
  //协议：// db地址:27017 /db_name (若无对应db_name 将自动创建)
  mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
  //监听mongoose定义的'open'事件, 数据库成功启动将调用回调函数
  // 可以在回调内写当打开数据库时做什么事情
  mongoose.connection.on('open',() => {

    console.log('MongoDB连接成功');

    // db启动后，通过modal去创建文档后续才可以保存到db中
    const user = new UserModal({
      nickname: 'charles',
      password: '12345',
      age: 18 
    })
    // 将数据保存到db中
    user.save();
    user.password='666666'    
  })
}

// 执行connect方法，进行数据库连接操作
connect();