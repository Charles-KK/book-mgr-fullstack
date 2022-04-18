const mongoose = require('mongoose')
const Router = require('@koa/router')
const { getRequestBody } = require('../../helpers/utils/index')
const { v4: uuidv4 } = require('uuid');

// gennerate inviteCode interface
const InviteCode = mongoose.model('InviteCode')

const router = new Router( {
  prefix: '/invite'
})
router.get('/add', async (ctx) => {
  const inviteCode = new InviteCode({
    inviteCode: uuidv4(),
    account: ''
  })
  // 存储
  const saved = await inviteCode.save();
  
  ctx.body = {
    code: 1,
    data: saved,
    msg: 'code generated!' 
  }
})

module.exports = router
 