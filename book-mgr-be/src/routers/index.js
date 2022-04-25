const auth = require('./auth/index')
const invite = require('./invite/index')
const book = require('./books')
module.exports = (app) => {
  app.use(auth.routes())
  app.use(invite.routes())
  app.use(book.routes())
}