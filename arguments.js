// arguments 通过 arguments 可以获得一个函数里的所有参数。注意，arguments 只能在函数内使用。它像数组，有 length 属性，但不是数组，没有数组特有的 push pop 等方法。

function fn1(a,b,c){
	console.log(arguments[0])
	console.log(arguments[1])
	console.log(arguments[2])
}

fn1(1,2,3);

// 1
// 2
// 3

// 如何把不是数组的 arguments 转换成真正的数组？

var args = Array.prototype.slice.call(arguments);

// 或者

var arg = [].slice.call(arguments);

// 或者

var args = [];
for(var i=0; i<arguments.length; i++){
	args.push(arguments[i])
}

// arguments 的 callee 属性，返回它所对应的原函数。但这个属性在严格模式是禁用的，所以不建议使用。

function fn(){
	console.log(arguments.callee === fn);
}

fn()	// true

// 如何拿到字符串参数中，字符串最长的那个参数？

function longestString(){
	var longest = '';
	for(var i=0; i<arguments.length; i++){
		if(arguments[i].length > longest.length){
			longest = arguments[i];
		}
	}

	return longest;
}



