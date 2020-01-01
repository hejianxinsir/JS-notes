function 摇色子(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let n = parseInt(Math.random()*6+1,10)  // 1-6
      resolve(n)
    },3000)
  })
}

// await 必须放在 async 为前缀的函数里面
// await 后面要接一个能返回 promise 的函数
// async 是 异步的 的意思，下面函数中 async 放在 test 函数前面为前缀
// 暗指 test 函数是一个异步函数。为什么是异步函数？
// 因为 await hehe() 这个要三秒后才执行完，执行完之后才赋给 n
// 所以说 test() 是一个异步函数
async function test(){
  let n = await 摇色子();
  console.log(n)
}

test()

// -----------------分隔线-------------------

function 猜大小(猜测){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      let n = parseInt(Math.random()*6+1,10)  // 1-6
      if(n>3){
        if(猜测 === '大'){
          resolve(n)
        }else{
          reject(n)
        }
      }else{
        if(猜测 === '小'){
          resolve(n)
        }else{
          reject(n)
        }
      }
    },500)
  })
}

// 获取错误的结果
async function test2(){
  try{
    let n = await 猜大小('大');
    console.log('中' + n)
  }catch(error){
    console.log('输光了' + error)
  }
}

test2()

// 著名面试题： 用 promise then 比 await 美观，但为什么要用 await ？
// 为了追求同步代码。把异步代码写成同步代码，使执行顺序更明显。

// 如果同时摇两个色子呢？我们先用 then 写一下
Promise.all([])
