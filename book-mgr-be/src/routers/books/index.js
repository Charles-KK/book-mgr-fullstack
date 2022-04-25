const mongoose = require('mongoose')
const Router = require('@koa/router')
const { getRequestBody } = require('../../helpers/utils/index')

const Book = mongoose.model('Book')

const router = new Router( {
  prefix: '/books'
})
router.post('/add', async (ctx) => {
  const {
    name,
    author, 
    price, 
    classify,
    publishDate
  } = getRequestBody(ctx)

  const book = new Book({
    name, 
    author,
    price,
    classify,
    publishDate
  })
  // 存储
  const res = await book.save();
  
  ctx.body = {
    code: 1,
    data: res,
    msg: 'add okk!' 
  }

}) 
// 没有 / ,但是请求路径自动加了，会404 why？？ 
router.get('/list', async (ctx) => {
  // 分页逻辑, query取URL上的相关参数
  const {
    // page是当前页码，size是每页总条数
    page = 1
  } = ctx.query

  // query取出来的是string类型的,mongoose的limit不能接受字符串类型
  let { size = 3 } = ctx.query
  size = Number(size);
  // 一开始没加await 返回空对象
  //要查第几页，就要跳过前面几页的总数据 skip（page-1）* size
  const list = await Book.find()
        .skip((page-1)* size)
        .limit(size)
        .exec();

  // size =只是一页的文档数，需要拿总数. 数据库异步操作，记得await
  const total = await Book.countDocuments();


  ctx.body = {
    code: 1,
    // data: list,
    data: {
      page,size,
      // 前端取来赋值
      list,total
    },
    msg: 'query okk!!'
  }
})


module.exports = router