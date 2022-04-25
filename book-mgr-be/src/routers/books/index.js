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
  let {
    // page是当前页码，size是每页总条数。
    page,
    size = 5,
    keyword
  } = ctx.query

  // query取出来的是string类型的,mongoose的limit不能接受字符串类型
  size = Number(size);
  // console.log(page, size);
  // 一开始没加await 返回空对象
  //要查第几页，就要跳过前面几页的总数据 skip（page-1）* size

  //按name查找，避免前端没传数据查空
  const query = {}
  if(keyword) {
    query.name = keyword
  }
 

  const list = await Book.find(query)
        .skip((page-1) * size)
        .limit(size)
        .exec();
  // size =只是一页的文档数，需要拿总数. 数据库异步操作，记得await
  const total = await Book.countDocuments();


  ctx.body = {
    code: 1,
    data: {
      page,size,
      list,total
    },
    msg: 'query okk!!'
  }
})

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params
  const deleteMsg = await Book.deleteOne({
    _id: id 
  })
  ctx.body = {
    code:1,
    data: deleteMsg,
    msg: 'delet ok!',
  }
})

module.exports = router