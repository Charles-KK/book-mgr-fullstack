// 体验模块化思维
// common.JS (require、module.export )
const a = 1;
getYearFromTimeStamp = (ts) => { 
  return new Date(ts).getFullYear();
}
getDateFromTimeStamp = (ts) => {
   return new Date(ts).getDate();
}

module.exports = {
  getYearFromTimeStamp,
  getDateFromTimeStamp,
  a
}

console.log('123');