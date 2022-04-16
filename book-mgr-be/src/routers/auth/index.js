const Router = require('@koa/router')
const mongoose = require('mongoose')

// 通过 mongoose.model() 拿到model (注意：需要执行User.js才能注册model: 在db入口文件中先require)
// 即便逻辑上注册了，还是报错：MissingSchemaError: Schema hasn't been registered for model "User".
//考虑服务的index.js中require执行顺序问题



const User = mongoose.model('User')

const router = new Router({
  prefix: '/auth'
});


// 编写后端接口 =>   分析业务逻辑，需要post方法， 以及用户对象(用户名、密码字段) 
router.post('/register', async (ctx) => {
  // console.log(ctx.request.body);
  const { account,password } = ctx.request.body;
  // 在数据库中检索是否已经存在同名用户
  const existing = User.find({account}).exec();
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
    code: 1,
    msg:'success',
    res:res
  }
  
  // ctx.body = '注册成功！'
})

router.post('/login', async (ctx) => {
  
  
  // ctx.body = 'login successfully!'
})

module.exports = router
