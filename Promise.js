

function hehe(){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			let n = parseInt(Math.random()*6+1,10)
			resolve(n)
		}, 3000)
	})
}

hehe().then(
	(x)=>{console.log('色子的点数是'+x)},
	()=>{console.log('摇色子还能失败？')}
)

// 这就是 promise 的用法。resolve 是成功后调用的函数，
// reject 是失败后调用的函数。由于摇色子也没失败一说，所以
// 我们就不给 reject 函数了。

// 那怎么拿到结果呢？结果 n 放到，resolve 里；接着用 .then
// 拿到摇色子的结果。.then 里面前一个是成功函数、后一个是失败函数。
// 前面 resolve(n) 的 n 会传到后面 .then 的第一个函数里，
// 于是我们就拿到了摇色子的结果

// 划重点：

return new Promise(function(resolve, reject){
  
})
