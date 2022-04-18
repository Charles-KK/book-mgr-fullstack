// 体验模块化思维
// common.JS (require、module.export )
// const a = 1;
// getYearFromTimeStamp = (ts) => { 
//   return new Date(ts).getFullYear();
// }
// getDateFromTimeStamp = (ts) => {
//    return new Date(ts).getDate();
// }

 getRequestBody = (ctx) => {
  return ctx.request.body || {};
 }

module.exports = {

  getRequestBody,

  // getYearFromTimeStamp,
  // getDateFromTimeStamp,
  // a

}

console.log('123');