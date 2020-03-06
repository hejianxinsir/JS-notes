## Object 对象的相关方法

- Object.getPrototypeOf() 返回参数对象的原型

```
var F = function(){}
var f = new F()
Object.getPrototypeOf(f) === F.ptototype
```

下面是几种特殊对象的原型：

```
Object.getPrototypeOf({}) === Object.prototype    //true
Object.getPrototypeOf(Object.prototype) === null     //true

function f(){}
Object.getPrototypeOf(f) === Function.prorotype    //true
```

- Object.setPtototypeOf() 为参数对象设置原型，返回该参数对象。它接受两个参数，第一个是现有对象，第二个是原型对象。

```
let a = {}
let b = {x: 1}
Object.setPrototypeOf(a, b)

Object.getPrototypeOf(a) === b    //true
a.x    // 1
```

- Object.create() 参数是对象。可以用来从实例对象，生成另一个实例对象；这个方法动态继承了原型，原型修改了，会立刻反映在实例对象上面。

```
// 原型对象
var A = {
    print: function (){
        console.log('hello')
    }
}

// 实例对象
var B = Object.create(A)

Object.getPrototypeOf(B) === A    //true
B.pint()    // hello
B.pint === A.print    // true
```

Object.create 方法可以用下面的代码替代。注意，为什么可以替代？Object.create 的原理就藏在下面的代码。

```
if( typeof Object.create !== 'function' ){
    Object.create = function(obj){
        function F(){}
        F.prototype = obj
        return new F()
    }
}
```

- Object.prototype.isPrototypeOf() 判断对象是否是参数对象的原型

```
var o1 = {}
var o2 = Object.create(o1)
var o3 = Object.create(o2)

o2.isPrototypeOf(o3)    // true
o1.isPrototypeOf(o3)    // true
```

还有几种：

```
Object.prototype.isPrototypeOf({})    // true
Object.prototype.isPrototypeOf([])    // true
Object.prototype.isPrototypeOf(/xyz/)    // true
Object.prototype.isPrototypeOf(Object.create(null))      // false
```

- Object.prototype.__proto__ 返回对象的原型

```
var obj = {}
var p = {}

obj.__proto__ = p
Object.getPrototypeof(obj) === p    // true
```

理解代码：

```
var A = {
    name: '张三'
}

var B = {
    name: '李四'
}

var proto = {
    print: function(){
        console.log(this.name)
    }
}

A.__proto__ = proto
B.__proto__ = proto

A.print()    // 张三
B.print()    // 李四

A.print === B.print    // true
A.print === proto.print    // true
B.print === proto.print    // true
```

说明 A B 的 print 方法都是调用 proto 的 print 方法。

- 获取原型对象的方法，有三种
obj.__proto / obj.constructor.prototype / Object.getPrototypeOf()
记住，第三种最可靠。即，Object.getPrototypeOf()

```
var obj = new Object()
obj.__proto__ === Object.prototype    // true
obj.__proto__ === obj.constructor.prototype    // true
```

另，

```
var P = function(){}
var p = new P()

var C = function(){}
C.prototype = p
var c = new C()

c.constructor.prototype === p    // false
```

上面是 false，所以改变原型对象时，要同时设置 constructor 属性。

```
C.prototype = p
C.prototype.constructor = C

var c = new C()
c.constructor.prototype === p    // true
```

- Object.getOwnPropertyNames() 返回一个数组，成员是参数对象本身的所有属性的键名，不包含继承的属性。注意，返回所有键名，不管是否可遍历。如果只获取那些可以遍历的属性，使用 Object.keys 方法。

```
Object.getOwnPropertyNames(Date)
// ...不写了，去浏览器控制台试试
```

- Object.prototype.hasOwnProperty() 返回一个布尔值，用于判断某个属性定义在对象自身，还是定义在原型链上。hasOwnProperty 方法是 JavaScript 之中唯一一个处理对象属性时，不会遍历原型链的方法。

```
Date.hasOwnProperty('length')    // true (定义在自身)
Date.hasOwnProperty('toString')    // false （定义在原型链上）
```

- in 运算符和 far...in 循环
in 运算符返回一个布尔值，表示一个对象是否具有某个属性，不论是自身的还是继承的。in 运算符常用于检查一个属性是否存在。

遍历对象所有可遍历的属性（不管是自身的还是继承的），可以使用 for...in 循环。

```
var o1 = {p1: 123}
var o2 = Object.create(o1, {
    p2: {value: 'abc', enumerable: true}
})

for(p in 02){
    console.info(p)
}

// p2
// p1
```

- 对象的拷贝

拷贝一个对象要做到两件事：1. 确保靠背后的对象，与原对象具有同样的原型；2. 确保拷贝后的对象，与原对象具有同样的属性。

用 ES2017 才引入标准的 Object.getOwnPropertyDescriptors 方法

```
function copyObject(orig) {
    return Object.create(
        Object.getPrototypeOf(orig),
        Object.getOwnPropertyDescriptors(orig)
    )
}
```
