// const fs = require('fs');
// // 当前目录同步写文件
// fs.writeFileSync('./1.txt','test');

const Koa = require('koa');
//实例化Koa对象
const app = new Koa();
// 模块化 require外部JS文件，会立刻执行，但是不能共享不同文件的变量
const untils = require('../helpers/utils/index.js')
console.log(untils);
const year = untils.getYearFromTimeStamp(new Date().getTime());
console.log(year);
//注册中间件  来处理请求
//中间件本质是一个函数，context 是请求上下文 => 当前网络请求的所有信息都在里面

//回调函数期望async函数
// next => await next() (等待一个promise决意后，再去执行接下来的顺序代码)

//test
// app.use(async (ctx, next) => {
//   // console.log(ctx)
//   // console.log(123); 每次请求都会执行此回调fn，每刷新一次页面，终端就打印一个123
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   //ES6 对象解构语法  ==> const path = ctx.path 
//   // 如果没有path属性，默认为undefined，因此我们可以通过如下方式手动给默认值
//   // const { path = '/' } = ctx;
//   // console.log(path);


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//   //处理请求，路由分发
//   // context.request 内有请求的所有信息，包括请求头请求体等信息
//   const { request:req } = ctx; // 拿到request属性值赋给rq变量
//   // console.log(req);
//   const { url } = req;
//   // 路由分发
//   if(url === '/') {
//     ctx.body = '<h1>Home Page</h1>'
//     return;
//   }
//   if(url === '/user/kzh') {
//     // ctx.response.body
//     ctx.body = '<h1>返回用户kzh的信息</h1>'
//     return;
//   }
//   if(url === '/settings') {
//     ctx.body = '返回设置页面信息'
//     return;
//   }

//   console.log('1')
//   await next();
//   console.log('3')
//   ctx.body = 'not found'
// })
// //注册第2个中间件
// app.use(async (ctx) => {
//   console.log('2')
//   ctx.body = '找不到资源'
// })
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//test await, 分析结果
app.use(async (ctx, next) => {
  // 最开始执行
  console.log('第1个中间件');
  await next();//阻塞
  //最后执行， 因此可以在此 计算请求时间
  console.log('第1个中间件末尾')
})
app.use(async (ctx, next) => {
  console.log('第2个中间件');
  await next();
  console.log('第2个中间件末尾')
})
app.use(async (ctx, next) => {
  console.log('第3个中间件');
  await next();
  console.log('第3个中间件末尾')
})


//++++++++++++++++++++++++++++++++++++++++++++++++++++++
// 开启一个HTTP服务，当被监听端口有HTTP请求时，Koa抓住HTTP请求并做处理，处理完后响应
// 浏览器默认端口80(https 443)
// app.listen(3000, () => {
//   // 
//   console.log('服务启动成功');
// })

 

// koa 
// 分支测试
console.log(1234);