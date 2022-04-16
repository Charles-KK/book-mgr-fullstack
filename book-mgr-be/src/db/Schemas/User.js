const mongoose = require('mongoose')
const { getMeta } = require('../helpers/getMeta')

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  meta: getMeta()
})
// 将定义完成的Schema注册成model
mongoose.model('User', UserSchema)
