const mongoose = require('mongoose')
const { getMeta } = require('../helpers/getMeta')

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: String,
  classify: String,
  publishDate: String,
  meta: getMeta()
})
// 将定义完成的Schema注册成model
mongoose.model('Book', BookSchema)