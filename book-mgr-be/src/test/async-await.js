// 由异步需求引入
//+++++++++++++++++++++++++++++++++++++++++++++

//  http模拟：一个接口需要跑5个前置接口才能拿到数据
// const req = (arg, cb) => {
//   setTimeout(() => {
//     console.log(arg);
//     cb(arg+1);
//   },1000)
// }
// 回调地域
// req(1, function(rs1) {
//   req(rs1,function(rs2){
//     req(rs2,function(rs3){
//       req(rs3,function(rs4){
//         req(rs4,function(rs5){
//           console.log('res5=', rs5);
//         })
//       })
//     })
//   });
// })

//+++++++++++++++++++++++++++++++++++++++++++++
// Promise

// new Promise, 实例化promise后立即执行作为参数传入的函数

  // const request = (arg, isRejected) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if(isRejected) {
  //         reject('出错了');
  //         return;
  //       }
  //       console.log(arg);
  //       resolve(arg + 1);
        
  //     }, 1000);
  //   });
  // }
  
  // request(1)
  //   .then((res1) => {
  //     // resolve被调用则说明成功了，此时执行then
  //     return request(res1);
  //   })
  //   .then((res2) => {
  //     return request(res2, true);
  //   }) 
  //   .catch((msg) => {
  //     console.log(msg);
  //     // catch内没有return,则会继续执行return Promise.resolve()
  //   })
  //   // undefined
  //   .then((res3) => {
  //     console.log('第三个then执行了');
  //     return request(res3)
  //   })
 
    //+++++++++++++++++++++++++++++++++++++++++++++

    // catch是语法糖写法相当于then的第二个参数(())
    // 验证
    //+++++++++++++++++++++++++++++++++++++++++++++
    // request(1)
    //   .then((res1) => {
    //     return request(res1, true);
    //   })
    //   .then((res2) => {
    //     // 没有执行
    //     console.log('res2 resolved');
    //     return request(res2)
    //   }, (err) => {
    //     console.log('catch error');
    //   })
      
//+++++++++++++++++++++++++++++++++++++++++++++

//通过async关键字去定义
  const fn = async ()=> {
   // 1. async函数返回Promise对象
    return 1;
  }
  // 2. fn1等价于fn
  const fn1 = () => {
    return new Promise((resolve, reject) => {
    resolve(1);
    })
  } 
  // fn().then(res => {
  //   // 1
  //   console.log('fn()=',res);
  // })

  // fn1().then(res => {
  //   console.log('fn1()=',res);
  // })
    const request =  (arg) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(arg);
          resolve(arg+1);
        }, 1000);
      })
    }

    
    const fn2 = async () => {
      // await only valid in async
      const res = await request(10);
      console.log(res);
    } 
    // fn2();

    //使用async/await 来代替 then链写法 实现上面的需求
    const fn3 = async () => {
      // 以同步的形式写异步的代码
      const res1 = await request(1);
      const res2 = await request(res1);
      const res3 = await request(res2);
      const res4 = await request(res3);
      const res5 = await request(res4);
      console.log(res5);
    }
    fn3();

