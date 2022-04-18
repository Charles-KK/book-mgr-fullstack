var jwt = require('jsonwebtoken');
// 第一个参数是需要加密的信息，第二个参数是秘钥secret=》结合加密算法将加密后的内容成为jwt第三段signature
var token = jwt.sign({ foo: 'bar',age:'123', id:567}, 'aaa');

console.log(token);

jwt.verify(token,'aaa',(err, payload) => {
  console.log(err, payload);
})