const Koa = require('koa');
// 先执行db后续路由才能拿到user.model
const koaBody = require('koa-body')
const { connect }  = require('./db/index')
const authRouters = require('./routers/index')
const cors = require('@koa/cors')

const app = new Koa();

// 注意数据库连接和启动服务的时序问题。启动数据库是异步的。如果时序不对可能数据库连接还没完成就有请求进来
// 将从connect函数改写成promise

// 等待数据库连接成功后再监听端口
connect().then(() => {
  //传递Koa实例进行路由注册
  // await 中间件执行顺序
  // app.use(async (ctx) => {
  // })
  app.use(cors())
  
  // 在路由触发到时要处理好请求体的解析
  app.use(koaBody())
  authRouters(app)

  // start http service, (broser default pn=80, https default pn=443)
  app.listen(3000,() => {
    console.log('服务启动成功');
  })
})

