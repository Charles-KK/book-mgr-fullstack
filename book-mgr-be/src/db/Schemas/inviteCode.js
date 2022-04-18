const { default: mongoose } = require("mongoose");
const { getMeta } = require("../helpers/getMeta")

const inviteSchema = new mongoose.Schema ( {
  inviteCode: String,
  account: String,
  meta: getMeta()
}) 
// register model 第一个参数是model名，后续在路由中写接口时，按需导入使用
mongoose.model('InviteCode', inviteSchema)