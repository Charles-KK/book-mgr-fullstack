const Router = require('@koa/router')
const mongoose = require('mongoose')

// 通过 mongoose.model() 拿到model (注意：需要执行User.js才能注册model: 在db入口文件中先require)
// 即便逻辑上注册了，还是报错：MissingSchemaError: Schema hasn't been registered for model "User".
//考虑服务的index.js中require执行顺序问题
const { getRequestBody } = require('../../helpers/utils/index')
// 如果 Model成功注册，就可以通过如下方式访问模型
const jwt = require('jsonwebtoken')
const { on } = require('koa')
const User = mongoose.model('User')
const router = new Router({
  prefix: '/auth'
});


// 编写后端接口 =>   分析业务逻辑，需要post方法， 以及用户对象(用户名、密码字段) 
router.post('/register', async (ctx) => {
  // console.log(ctx.request.body);
  const { account, password } = getRequestBody(ctx);

  // 后端数据校验
  if(account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: "用户名或密码为空！",
      data: null 
    }
    return;
  }


  // 在数据库中检索是否已经存在同名用户
  console.log({account});
  const existing = await User.findOne({account}).exec();
  console.log(existing);
  if(existing) {
    ctx.body = {
      code: 0,
      msg: "用户已存在",
      data: null 
    }
    return;
  }
  const user = new User({
    account, password
  })
  // 保存时存一下结果
  const res = await user.save();

  // koa会将该响应处理成Json
  ctx.body = {
    code:  1,
    msg: '注册成功 ~', 
    data: res
  }
  
  // ctx.body = '注册成功！'
})

router.post('/login', async (ctx) => {
  const { account, password } = getRequestBody(ctx);
  // 需要等待promise,查询需要时间。否则打印one是pending
  const one = await User.findOne({account});
  

  console.log(account, password)
  console.log(one.account, one.password)
  if(!one) {
    ctx.body = {
      code: 0,
      msg: '用户名或密码错误',
      data: null
    }
    return;
  }
  
  const userInfo = {
    account: one.account,
    _id: one._id
  }  
  console.log(userInfo);
  if(password === one.password) {
    ctx.body = {
      code: '1',
      msg: '登录成功',
      data: {
        username: userInfo.account,
        token:jwt.sign({
          userInfo
        },'mgr-book')
      }
    }
    return;
  }
  ctx.body = {
    code: 0,
    msg: '用户名或密码错误',
    data: null
  }
})

module.exports = router
