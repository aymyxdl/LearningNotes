# JavaScript高级
(已完成)


## 数据类型

typeof 的返回值类型 (返回值都是字符串类型)

'undefined'
'string'
'number'
'boolean'
'function'
'objcet'      // typeof null , typeof [] 的返回值都是 object
所以typeof 不能判断 null 和 数组


instanceof    判断对象的具体类型： A instanceof B
只要 B 在 A 的原型链上，就返回true, 这个原型链是隐式原型链，也就是 __proto__



undefined 与 null 的区别
undefined 代表定义了，但是未赋值
null 代表 定义并赋值了，只是值为 null


(代码测试)：
vue3-create-project-default\src\components\typeof\Typeof.vue

对应视频：
对应笔记：JavaScript_Advance\work\01_基础总结深入\01_数据类型.html
JavaScript_Advance\work\01_基础总结深入\01_数据类型2.html



## 数据_变量_内存

内存分类：
  栈： 全局变量/局部变量
  堆： 对象(注意，方法中的代码块是在堆中，但是方法名是在栈中，因为函数名也是变量)


在js调用函数时传递变量参数时，是值传递



对应视频：
对应笔记：JavaScript_Advance\work\01_基础总结深入\02_数据_变量_内存.html
JavaScript_Advance\work\01_基础总结深入\02_数据_变量_内存2.html
JavaScript_Advance\work\01_基础总结深入\02_数据_变量_内存3.html
JavaScript_Advance\work\01_基础总结深入\02_数据_变量_内存4.html
JavaScript_Advance\work\01_基础总结深入\02_数据_变量_内存5.html




## 对象

对象的组成
  属性： 属性名(字符串)和属性值(任意)组成
  方法： 一种特别的属性(属性值是函数)

如何访问对象内部数据？
  .属性名         编码简单，有时不能用
  ['属性名']      编码复杂，能通用


什么时候必须使用 ['属性名'] 的方式？
  1. 属性名包含特殊字符： - 空格
  2. 变量名不确定(属性名不确定，也就是key不确定)

对应视频：
对应笔记：JavaScript_Advance\work\01_基础总结深入\02_数据_变量_内存.html


## 函数


注意一点：函数声明 和 表达式 两种方式定义函数还是有差别的：在变量提升方面有差异


对应视频：
对应笔记：JavaScript_Advance\work\01_基础总结深入\04_函数.html


## 回调函数

1. 什么函数才是回调函数？
  1. 你定义的
  2. 你没有调用
  3. 但最终他执行了
2. 常见的回调函数？
  1. dom事件回调函数
  2. 定时器回调函数
  3. ajax请求回调函数
  4. 生命周期回调函数

对应视频：
对应笔记：JavaScript_Advance\work\01_基础总结深入\05_回调函数.html


## IIFE

1. 理解
  1. 全称： Immediately-Invoked Function Expression
  2. 立即执行(调用)函数表达式

2. 作用
  1. 隐藏实现
  2. 不会污染外部(全局)命名空间
  3. 用它来编写JS模块

匿名函数自调用(实际就是 IIFE，是同一个概念)
(function () {
    console.log('....');
})();

(function () {
  var a = 1;
  function test () {
    console.log(++a);
  };
  window.$ = function () {    // 向外暴露一个函数
    return {
      test: test
    }
  }
})()

console.log($().test());    // 2
console.log($().test());    // 3
console.log($().test());    // 4


立即执行函数一点非常重要的特性就是用来编写模块（和闭包一起来编写模块）


对应视频：
对应笔记：JavaScript_Advance\work\01_基础总结深入\06_IIFE.html



## this

1.this是什么
  任何函数本质上都是通过某个对象来调用的，如果没有直接指定，就是window
  （你自己明确指定的 或者 背后指定的）

2.如何确定 this 的值
  test()      window
  p.test()    p
  new test()  新创建的对象
  p.call(obj) obj


this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁
实际上this的最终指向的是那个调用它的对象

上面这句话的前提是普通函数，ES6的箭头函数中的this，在函数声明的时候就已经确定了（就是外层函数的this）





这里扩展一下： new 操作符

知识点1：
首先，new 做了什么:
new 一个对象时，发生了四步

var p = new Person()

1.创建一个新对象 var obj = {};
2.设置新对象的__proto__属性指向构造函数的prototype对象
  obj.__proto__ = Person.prototype;
3.使用新对象调用函数，函数中的this被指向新实例对象：
  Person.call(obj)
4.将初始化完毕的新对象地址，保存到等号左边的变量中
  p = obj;





知识点2：
构造函数的返回值情况（构造函数的条件就是new 了，不new不算构造函数，就是普通调用）
如果构造函数的返回值是 普通类型：字符串、数字、布尔、undefined、null，则不算返回值，实际返回其实例对象
  还要加上 return this (实测，实际返回实例对象)

如果构造函数的返回值是引用类型，那么就返回这个引用类型，而不是返回实例对象



知识点3：
另外，new方法的时候 后面 加括号 和 不加括号的区别：
一般没有区别，加不加括号无所谓

但是不加括号，在有些时候会导致优先级的问题

比如：


function Parent(){
  this.num = 1;
}
console.log(new Parent().num);
console.log(new Parent.num)


这个还算简单的，这里有个更复杂的

function Foo() {
  getName = function () {
    alert(1);
  };
  return this;
}
Foo.getName = function () {
  alert(2);
};
Foo.prototype.getName = function () {
  alert(3);
};
var getName = function () {
  alert(4);
};
function getName() {
  alert(5);
}

Foo.getName();	
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();



很多帖子优先级他们都搞错了，具体可以查看 js 运算符优先级
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence


我们这里用到的有
20  成员访问	从左到右                … . …
20  new (带参数列表)	n/a           new … ( … )
20  函数调用	从左到右                … ( … )
19	new (无参数列表)	从右到左        new …

上面这些() 不是21级的圆括号，
如果要算作圆括号的话，需要里面有表达式，比如 (a * b)
单纯的这里的() 是函数调用的意思

因此，开始分析

1.Foo.getName();	
这里用到了两个运算符  成员访问(20) 和 函数调用(20)
因此拆分成
  Foo.getName
             ()
第一步调用 Foo的属性getName
第二部使用 () 调用执行此方法
因此结果是 alert(2)


2.getName();
这里只用到了运算符 函数调用(20)
因此只有一步
就是调用函数 getName

不过这里有个隐藏点：
因为先执行 变量提升 var getName = undefined
然后执行 函数提升
function getName() {
  alert(5);
}
最后进行了 变量赋值
getName = function () {
  alert(4);
};
因此这里执行的代码是 --> alert(4)


3.Foo().getName();
这里用到了两个运算符  函数调用(20) 和 成员访问(20)
遵循从左到右的原则
  Foo()
       .getName
               ()

然后第一步调用 Foo() 的时候
因为函数内部的赋值并没有 声明
所以会变量泄漏，导致变量升级成全局变量
因此
window.getName = function () {
  alert(1);
};


然后返回的this就是window，直接调用了此函数 --> alert(1)


4.getName();
这里因为上一部重新覆盖了，所以alert(1)



关键点是下面这三个表达式（因为带了new ，复杂一点）


5.new Foo.getName();
这里看起来用到了三个运算符 new (无参数列表)(19) 成员访问(20) 和 函数调用(20)
实际上不是的

按照优先度来先是成员访问
    Foo.getName

第一步获取Foo.getName，得到的返回值是一个函数
然后代码变成了
    返回值
new       ()
这个时候第二步组成了 new (带参数列表) (20)
因为返回值是函数，所以现在变成了构造函数的执行 --> alert(2)


至于为什么说这里变成 执行构造函数，而不是先 函数调用(20)

    返回值
         ()
new

如果先执行 函数调用 --> 返回值() 的返回值会变成 --> undefined

new undefined 会报错
你可以把代码改成
new (Foo.getName());
效果就是分三步执行，报错






6.new Foo().getName();
这里是真的用到了三个运算符 new (带参数列表)(20) 成员访问(20) 和 函数调用(20)
我这里有个问题： 执行顺序 n/a 表示什么意思？（我这里不知道什么意思，猜是最先执行？）


代码拆分
new Foo()
         .getName
                 ()

第一步先执行构造函数 返回实例对象
第二部调用实例对象的 getName 属性，因为实例没有，通过原型链在 Foo.prototype 上找到了
第三步，执行调用此方法 --> alert(3)



7. new new Foo().getName();
这里看似用到了三个运算符 new (带参数列表)(20) 成员访问(20) 和 函数调用(20)
实际上只用到了两个运算符 new (带参数列表)(20) 成员访问(20)

    new Foo()
             .getName
new                  ()

第一步先执行构造函数 返回实例对象
第二部调用实例对象的 getName 属性，因为实例没有，通过原型链在 Foo.prototype 上找到了
第三步 又变成了 new (带参数列表)(20)
相当于

new Foo.prototype.getName()
执行了 alert(3),然后返回了个实例对象
不信可以接收返回值log一下，还可以通过__proto__查看

因此整体代码执行下来就是 2 4 1 1 2 3 3


这里的代码执行 完美的遵循了 代码的定义
比如 函数默认返回 undefined
构造函数返回this




(代码测试)：
vue3-create-project-default\src\components\this\NewThisCom.vue

对应视频：
对应笔记：JavaScript_Advance\work\01_基础总结深入\07_函数中的this.html


## 原型与原型链


### 原型(prototype)

1.函数的prototype属性(图)
  每个函数都有一个prototype属性，它默认指向一个Object空对象(即称为：原型对象)
  原型对象中有一个属性constructor，它指向函数对象

2.给原型对象添加属性(一般都是方法)
  作用：函数的所有实例对象自动拥有原型中的属性(方法)

  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\01_原型与原型链\01_原型(prototype).html



### 显示原型和隐式原型

1.每个函数function都有一个prototype，即显示原型（显示原型属性）
  2.每个实例对象都有一个__proto__，可称为隐式原型（隐式原型属性）
  3.对象的隐式原型的值 为其对应 构造函数 的显示原型的值
  4.内存结构（图）
  5.总结：
    函数的prototype属性：在定义函数时自动添加的，默认值是一个空Object对象
    对象的__proto__属性：创建对象时自动添加的，默认值为构造函数的prototype属性值
    程序员能直接操作显示原型，但不能直接操作隐式原型（ES6之前）



function Person(){}
var p = new Person();
p.__proto__ === person.prototype

另外这里有一点非常容易搞错
p.__proto__.__proto__ 指向哪里

person.__proto__
person.__proto__.__proto__ 又分别指向哪里



3.对象的隐式原型的值 为其对应 构造函数的显示原型的值
console.log(Fn.prototype === fn.__proto__);

深入详解：
这里需要注意，我们并没有给fn设置 __proto__，那么它是怎么来的呢?
是在 new 的时候，浏览器自动赋值的
var fn = new Fn() 时候的内部语句 fn.__proto__ = Fn.prototype 或者写成 this.__proto__ = Fn.prototype

那么同样的，Fn的prototype 属性又是如何来的呢？
同理：在声明函数的时候，浏览器自动添加的
function Fn() {} 时候的内部语句  Fn.prototype = {} 或者写成 this.prototype = {}  


所以，我很多时候对this都很难搞懂，本来概念清晰了， this.prototype = {} ，这里的 this又是指向谁呢？
按照理解来说，this是谁调用就是谁，如果 调用 Fn()，那么this应该就是window
不过函数声明 function Fn() {} 时候，内部执行的语句，这个时候，并没有谁调用Fn，而是Fn本身调用自己，完成内部操作吗？
只有这样解释，我才能自圆其说 this 指向 Fn

补充：
至于 this.__proto__ = Fn.prototype 倒是可以解释的通
看过上面 new 的四个步骤就知道了
然后把 第二步骤 的 fn.__proto__ = Fn.prototype 换成 this.__proto__ = Fn.prototype
那么通过第三步的 Fn.call(obj) ,这个时候改变了this的指向，所以也能说得通


另外，Fn.__proto__  Function.__proto__  分别指向哪里

  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\01_原型与原型链\02_显示原型与隐式原型.html


### 原型链

1.原型链（图解）
  访问一个对象的属性时，
    现在自身属性中查找，找到返回
    如果没有，再沿着__proto__这条链向上查找，找到返回
    如果最终没找到，返回undefined

  别名：隐式原型链
  作用：查找对象的属性（方法）

2.构造函数/原型/实例对象的关系（图解）
  构造函数/原型/实例对象的关系2（图解2）


注意：
1.函数的显示原型指向的对象默认是空的Object实例对象（但Object不满足）
  只有 Object 例外

2.所有函数都是Function的实例(没有例外，包括Function它本身)

3.Object的原型对象是原型链的尽头


这章详细的看对应笔记

  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\01_原型与原型链\03_原型链.html


### 原型链_属性问题

1. 读取对象的属性值时：会自动到原型链中查找
2. 设置对象的属性值时：不会查找原型链，如果当前对象中没有此属性，直接添加此属性并设置其值
3. 方法一般定义在原型中，属性一般通过构造函数定义在对象本身上
  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\01_原型与原型链\04_原型链_属性问题.html


### 探索instanceof

1.instanceof是如何判断的？
  表达式： A instanceof B
  如果B函数的显示原型对象在 A对象的原型链(隐式原型查找)上，返回true，否则返回false

2.Function 是通过new 自己产生的实例


console.log(Object instanceof Function);  
console.log(Object instanceof Object);    
console.log(Function instanceof Function);

  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\01_原型与原型链\05_探索instanceof.html



### 面试题
/*
  测试题1
*/

function A () {}

A.prototype.n = 1;

var b = new A();

A.prototype = {
  n: 2,
  m: 3,
};

var c = new A();
console.log(b.n, b.m, c.n, c.m);


/*
  测试题2
*/

function F () {}

Object.prototype.a = function () {
  console.log('a()');
};

Function.prototype.b = function () {
    console.log('b()');
};

var f = new F();
f.a();
f.b();
F.a();
F.b();

(代码测试)：
vue3-create-project-default\src\components\proto\PrototypeCom.vue

  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\01_原型与原型链\06_面试题.html


## 执行上下文与执行上下文栈

### 变量提升与函数提升


1.变量声明提升(严格来讲是叫：变量声明提升，省略可以叫变量提升)
  通过var定义(声明)的变量，在定义语句之前就可以访问到
  值：undefined

2.函数声明提升(省略叫 函数提升)
  通过function声明的函数，在之前就可以直接调用
  值：函数定义（对象）

  注意，函数的定义有两种，一种是声明的类型，一种是表达式(也就是赋值，这时属于变量声明提升)


另外：提升的顺序是先进行 变量提升，再进行 函数提升
因此，如果存在同名覆盖，那么永远是存在 函数提升，因为变量提升被覆盖了


  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\02_执行上下文与执行上下文栈\01_变量提升与函数提升.html


### 执行上下文

1.代码分类（位置）
  全局代码
  函数(局部)代码

2.全局执行上下文
  在执行全局代码前将window确定为全局执行上下文
  对全局数据进行预处理
    var定义的全局变量 ==> undefined，添加为window属性
    function声明的全局函数 ==> 赋值(fun)，添加为window的方法
    this ==> 赋值(window)
  开始执行全局代码

3.函数执行上下文
  在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象(虚拟的，存在于栈中)
  对局部数据进行预处理
    形参变量 ==> 赋值(实参) ==> 添加为执行上下文的属性
    arguments ==> 赋值(实参列表)，添加为执行上下文的属性
    var定义的局部变量 ==> undefined，添加为执行上下文的属性
    function声明的函数 ==> 赋值(fun)，添加为执行上下文的方法
    this ==> 赋值(调用函数的对象)
  开始执行函数体代码


a1 和 window.a1 基本上是相同的(为什么说基本上，而不是完全相同，是因为还是有一点点的差异，后面再讲，现在讲容易搞混)
这里没搞懂


执行上下文调用的时候才产生，定义的时候不产生
因此函数声明时，不产生函数执行上下文，调用的时候才会有


也就是说：调用一次函数，产生一个执行上下文
因此：函数执行上下文的个数为 n + 1

这个 n 为函数调用的次数， 1 为全局执行上下文

  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\02_执行上下文与执行上下文栈\02_执行上下文.html



### 执行上下文栈

1. 在全局代码执行前，JS引擎就会创建一个栈来存储管理所有的执行上下文对象
2. 在全局执行上下文(window)确定后，将其添加到栈中（压栈）
3. 在函数执行上下文创建后，将其添加到栈中（压栈）
4. 在当前函数执行完毕后，将栈顶的对象移除（出栈）
5. 当所有的代码执行完后，栈中只剩下window

1. 依次输出什么？
2. 整个过程中产生了几个执行上下文？ 

console.log('global begin: ' + i);
var i = 1;
foo(1);
function foo(i) {
  if (i == 4) {
    return;
  }
  console.log('foo() begin: ' + i);
  foo(i + 1); // 递归调用：在函数内部调用自己
  console.log('foo() end: ' + i);
}
console.log('global end: ' + i);

产生了5个执行上下文

全局执行上下文 和 全局执行上下文栈 的区别

全局执行上下文栈是在栈中开辟的一块内存空间
用来存放当前的执行上下文的
（只有当前还在执行的函数会存在于 此栈中，因为执行完的函数都已经出栈了）


  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\02_执行上下文与执行上下文栈\04_执行上下文栈.html
JavaScript_Advance\work\02_函数高级\02_执行上下文与执行上下文栈\04_执行上下文栈2.html



### 面试题

/*
  面试题1:
*/

function a() {};
var a;
console.log(typeof a);




/*
  面试题2:
*/

if (!(b in window)) {
  var b = 1;
}
console.log(b);




/*
  面试题3:
*/

var c = 1;
function c(c) {
  console.log(c);
};
c(2);   




(代码测试)：vue3-create-project-default\src\components\context\ContextCom.vue

  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\02_执行上下文与执行上下文栈\05_面试题.html




## 作用域与作用域链

### 作用域

1. 理解
  * 就是一块"地盘", 一个代码段所在的区域
  * 它是静态的(相对于上下文对象), 在编写代码时就确定了
2. 分类
  * 全局作用域
  * 函数作用域
  * 没有块作用域(ES6有了)
3. 作用
  * 隔离变量，不同作用域下同名变量不会有冲突

作用域的个数也是 n + 1 个
不过执行上下文的 n 是调用函数的次数
作用域的 n 是 定义函数的个数


记住：只有函数才会产生作用域
作用域的外层作用域，也必须是函数环境



(代码测试)：vue3-create-project-default\src\components\scope\ScopeCom.vue

  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\03_作用域与作用域链\01_作用域.html



### 作用域与执行上下文

1.区别1
  全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了，而不是在函数调用时
  全局执行上下文环境是在全局作用域确定之后，js代码马上执行之前创建
  函数执行上下文是在调用函数时，函数体代码执行之前创建

2.区别2
  作用域是静态的，只要函数定义好了就一直存在，且不会再变化
  执行上下文是动态的，调用函数时创建，函数调用结束时就会自动释放

3.联系
  执行上下文(对象)是从属于所在的作用域
  全局执行上下文(全局上下文环境) ===> 全局作用域
  函数执行上下文 ===> 对应的函数作用域


上下文 是依附于 作用域的


对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\03_作用域与作用域链\02_作用域与执行上下文.html



### 作用域链

1.理解
  多个上下级关系的作用域形成的链，它的方向是从下向上的（从内到外）
  查找变量时就是沿着作用域链来查找的

2.查找一个变量的查找规则
  在当前作用域下的执行上下文中查找对应的属性，如果有直接返回，否则进入2
  在上一级作用域的执行上下文中查找对应的属性，如果有直接返回，否则进入3
  再次执行2的相同操作，直到全局作用域，如果还找不到就抛出找不到的异常


对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\03_作用域与作用域链\03_作用域链.html


### 面试题

面试题1

var x = 10;
function fn() {
  console.log(x);
};

function show(f) {
  var x = 20;
  f();
};

show(fn);


这个可能会有点迷惑性，不如分析一下每个函数内部的this


面试题2

var fn = function () {
  console.log(fn);
};
fn();

var obj = {
  fn2: function() {
    console.log(fn2);
  }
};

obj.fn2()


对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\03_作用域与作用域链\04_作用域_面试题.html
JavaScript_Advance\work\02_函数高级\03_作用域与作用域链\04_作用域_面试题2.html


## 闭包

### 引入

在ES6 的块级作用域之前
遍历监听按钮的时候，因为没有块级作用域，导致回调函数中的变量总是变成最后一次的值
那个时候用的是闭包解决这个问题


  
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\04_闭包\00_引入.html



### 理解闭包

JS中号称两大神兽：原型和闭包

1.如何产生闭包？
  当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时，就产生了闭包<!-- 这是条件 -->

2.闭包到底是什么？
  使用chrome调试查看
  理解一： 闭包是嵌套的内部函数(绝大部分人)
  理解二： 包含被引用变量(函数)的对象(极少数人)   (闭包是内部函数中包含了一个对象([[scope]].closure)，对象中有被引用的变量)
  注意： 闭包存在于嵌套的内部函数中

3.产生闭包的条件？
  函数嵌套
  内部函数引用了外部函数的数据(变量/函数)
  (还有一个：就是必须调用外部函数)


注意1：
嵌套的理解： 只要是嵌套，就算数

注意2:
this 不算引用外部的变量，所以不会产生闭包


// 不管是函数声明的形式
function a() {
  function b () {

  }
}

// 还是变量声明的形式
function a() {
  var b = function () {

  }
}

// 亦或是变量属性的形式

function a() {
  var b = {
    a: '',
    b: function() {

    }
  }
}

// 这些情况，统统都属于函数的嵌套


注意2：闭包的产生条件和 内部函数是否返回外部的变量无关
只要内部函数引用了外部变量，就会产生闭包
但是返回外部变量，决定闭包是否可以一直存在
另外，如果使用完毕，记住释放闭包，不然，会导致内存泄漏




对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\04_闭包\01_理解闭包.html


### 常见的闭包

1. 将函数作为另一个函数的返回值
2. 将函数作为实参传递给另一个函数调用

1.将函数作为另一个函数的返回值
(感觉这应该说成：将引用了外部函数变量 的内部函数 作为 外部函数的 返回值)

function fn1() {
  var a = 2;
  function fn2() {    // 这样引用了外部变量才会有
    a++;
    console.log(a);
  };
  return fn2;
};
var f = fn1();

f();    //  3
f();    //  4

问：上面的代码过程中，总共产生了几个闭包？
答：1个，因为只产生了一个内部函数对象(fn2)：闭包是存在内部函数对象中的
     因为外部函数fn1 只调用了一次，所以，只产生了一个内部对象fn2
     f()这里表示的是调用，在执行内部函数，而不是创建
     如果，需要产生多个，要多次调用fn1
var fnn = fn1();
fnn();



2.将函数作为实参传递给另一个函数调用
(这个定义感觉有点问题，无法理解)

function showDelay(msg, time) {
  setTimeout(function () {
    // alert(msg); //  如果注释，就不会产生闭包
    alert(msg); //产生了闭包
  }, time);
};
showDelay('atguigu', 2000);

 
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\04_闭包\02_常见的闭包.html


### 闭包的作用

1. 使函数内部的变量在函数执行完后，仍然存活在内存中(延长了局部变量的生命周期)
2. 让函数外部可以操作(读/写)到函数内部的数据(变量/函数)

问题：

1. 函数执行完毕后，函数内部声明的局部变量是否还存在？ 一般不存在，存在于闭包中的变量才可能存在
2. 在函数外部能直接访问函数内部的局部变量吗？        不能，但我们可以通过闭包让外部操作它

注意上面的描述：其它变量不存在，只有内部函数引用的变量才会存在内存，其它的都释放了

 
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\04_闭包\03_闭包的作用.html


### 闭包的生命周期

1. 产生：在嵌套内部函数定义执行完时就产生了(不是在内部调用: 不过定义的时候外部函数肯定就执行了，这个不可少)
2. 死亡：在嵌套的内部函数成为垃圾对象时

对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\04_闭包\04_闭包的生命周期.html


### 闭包的应用

闭包的作用：
1. 使函数内部的变量在函数执行完后，仍然存活在内存中(延长了局部变量的生命周期)
2. 让函数外部可以操作(读/写)到函数内部的数据(变量/函数)
3. 防止变量污染
4. 自定义模块(编写JS模块,可以和 IIFE一起)


要跟IIFE的作用区别开：
1. 隐藏实现
2. 不会污染外部(全局)命名空间
3. 用它来编写JS模块(配合闭包)


闭包 和 IIFE 都可以 防止变量污染

个人感觉：防止变量污染的原因
还是在于 执行环境(执行上下文，宽泛一点的话，说作用域也行)

因为函数内部的环境是一个独立的内存空间，可以重新声明和外部名称一样的变量


所以严格来说，我个人感觉 不是 闭包和IIFE 都可以 防止变量污染
只不过 闭包和 IIFE 都有这样的前提本质条件（也就是有函数执行，能够产生函数上下文:局部环境）




### 自定义模块

使用 闭包和 IIFE 一起来自定义模块(不用IIFE也可以，不过要手动调用一次就是了，用了IIFE更方便)
实现一个具有特定功能的js文件
将所有的数据和功能都封装在一个函数内部(私有的)
只向外暴露一个包含 n 个方法的对象或函数
模块的使用者，只需要通过模块暴露的对象调用方法来实现对应的功能

 
对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\04_闭包\05_闭包的应用_自定义JS模块.html
JavaScript_Advance\work\02_函数高级\04_闭包\05_闭包的应用_自定义JS模块2.html



### 闭包的缺点

1.缺点
  函数执行完后，函数内的局部变量没有释放，占用内存事件会变长(这一点，既是优点，也是缺点)
  容易造成内存泄漏(使用完了闭包，内存白白占用着，浪费)

2.解决
  能不用闭包就不用
  及时释放


对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\04_闭包\06_闭包的缺点及解决.html


### 面试题

// 代码片段一
var name = 'The window';
var object = {
  name: 'My Object',
  getNameFunc: function() {
    return function() {
      return this.name;
    };
  }
};


// 代码片段二

var name2 = "The Window";
var object2 = {
  name2: 'My Object',
  getNameFunc: function() {
    var that = this;
    return function() {
      return that.name2;
    };
  }
}


// 我自己改进的
var obj3 = {name2: 'i am obj3'};
alert(object2.getNameFunc.call(obj3)());


// 代码片段三

function fun(n, o) {
  console.log(o);
  return {
    fun: function(m) {
      return fun(m, n);
    }
  };
}

var a = fun(0); a.fun(1); a.fun(2); a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1); c.fun(2); c.fun(3);


对应视频：
对应笔记：JavaScript_Advance\work\02_函数高级\04_闭包\07_面试题1.html
JavaScript_Advance\work\02_函数高级\04_闭包\07_面试题2.html




## 对象创建模式


### Object构造函数模式

方式一：Object构造函数模式
  套路：先创建空Object对象，再动态添加属性/方法
  适用场景：起始时不确定对象内部数据
  问题：语句太多


// 一个人：name: 'Tom', age: 12

var p = new Object();
p.name = 'Tom';
p.age = 12;
p.setName = function (name) {
  this.name = name
}


对应视频：
对应笔记：JavaScript_Advance\work\03_对象高级\01_对象创建模式\01_Object构造函数模式.html

### 对象字面量模式

方式二：对象字面量模式
  套路：使用{}创建对象，同时指定属性/方法
  适用场景：起始时对象内部数据是确定的
  问题：如果创建多个对象，有重复代码


var p = {
  name: 'Tom',
  age: 12,
  setName: function (name) {
    this.name = name
  }
};


var p2 = {  // 如果创建多个对象代码很重复
  name: 'Bob',
  age: 13,
  setName: function (name) {
    this.name = name
  }
};


对应视频：
对应笔记：JavaScript_Advance\work\03_对象高级\01_对象创建模式\02_对象字面量.html

### 工厂模式

方式三：工厂模式
  套路：通过工厂函数动态创建对象并返回
  适用场景：需要创建多个对象
  问题：对象没有一个具体的类型，都是Object类型


// 返回一个对象的函数，都可以称为 工厂函数
function createPerson(name, age) {
  var obj = {
    name: name,
    age: age,
    setName: function(name) {
      this.name = name;
    }
  }

  return obj;
}


// 创建2个人
var p1 = createPerson('Tom', 12);
var p2 = createPerson('Bob', 13);

// p1/p2 是 Object类型 



function createStudent(name, price) {
  var obj = {
    name: name,
    price: price
  }

  return obj;
}

var s = createStudent('张三', 12000);

// s 也是 Object类型



对应视频：
对应笔记：JavaScript_Advance\work\03_对象高级\01_对象创建模式\03_工厂模式.html


### 自定义构造函数模式


方式四：自定义构造函数模式
  套路：自定义构造函数，通过new创建对象
  适用场景：需要创建多个类型确定的对象
  问题：每个对象都有相同的数据，浪费内存


// 定义类型
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.setName = function(name) {
    this.name = name;
  }
}

var p1 = new Person('Tom', 12);
console.log(p1 instanceof Person);


// 缺点：什么叫做相同的数据？
var p2 = new Person('Jack', 23);


// 他们都有setName 这个方法
console.log(p1.setName === p2.setName, '=====');
// 他们虽然功能一样，但其实是两个对象
// 两个代码完全一样的对象(地址不同),占用内存空间，浪费
// 而p1 和 p2 有没有完全一样的东西？
// 有， __proto__ ，所以想办法把完全一样的东西，放到这里面来
// 因此，就引出了 构造函数+原型的组合模式



对应视频：
对应笔记：JavaScript_Advance\work\03_对象高级\01_对象创建模式\04_自定义构造函数模式.html


### 构造函数+原型的组合模式

方式六：构造函数+原型的组合模式<!-- 视频这里为什么是六？ -->
  套路：自定义构造函数，属性在函数中初始化，方法添加到原型上
  使用场景：需要创建多个类型确定的对象


// 在构造函数中只初始化一般函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.setName = function(name) {
  this.name = name;
}

var p1 = new Person('Tom', 23);
var p1 = new Person('Jack', 24);


会发现，随着上面这些知识点的一点点深入，代码一点点的完善：
越来越趋近于 js的继承



对应视频：
对应笔记：JavaScript_Advance\work\03_对象高级\01_对象创建模式\05_构造函数+原型的组合模式.html


## 继承模式


### 原型链继承

方式1：原型链继承
1. 套路：
  1. 定义父类型构造函数
  2. 给父类型的原型添加方法
  3. 定义子类型构造函数
  4. 创建父类型的对象赋值给子类型的原型
  5. 将子类型原型的构造属性设置为子类型
  6. 给子类型原型添加方法
  7. 创建子类型的对象：可以调用父类型的方法

2. 关键：
  1. 子类型的原型为父类型的一个实例对象

// 父类型
function Super() {
  this.superProp = 'Super property';
}
Super.prototype.showSuperProp = function () {
  console.log(this.superProp);;
}

// 子类型
function Sub() {
  this.subProp = 'Sub property';
}

// 子类型的原型为弗雷西的一个实例对象（不过这样的方法，必须写在所有prototype操作的最前面，不然会丢失）
Sub.prototype = new Super();

// 这里还需要多做一步，不然constructor会出问题
// 让子类型的原型的constructor指向子类型(这里是加了一个原本没有的 constructor 属性)
Sub.prototype.constructor = Sub;

Sub.prototype.showSubProp = function () {
  console.log(this.subProp);;
}


// 相比于上面需要先设置子类型的显示原型，然后再更改 constructor
// 这样随便写在哪里，但是作用域链多了一层(super)，这是我自己发散思维想到的，不知道有什么缺点
// Sub.prototype.__proto__ = new Super();



对应视频：
对应笔记：JavaScript_Advance\work\03_对象高级\02_继承模式\02_借用构造函数继承.html


### 借用构造函数继承

方式2： 借用构造函数继承(假的)
1. 套路：
  1. 定义父类型构造函数
  2. 定义子类型构造函数
  3. 在子类型构造函数中调用父类型构造

2. 关键：
  1. 在子类型构造函数中通过call()调用父类型构造函数

这个假的意思是这里并没有真的实现继承

function Person (name, age) {
  this.name = name;
  this.age = age;
}

function Student(name, age, price) {
  Person.call(this, name, age);   // 相当于：this.Person(name, age)
  this.price = price
  // 这里Student没有person函数，于是借用了Person
  // 因此这个call来借用执行
  // 谁来执行？this，那么this又是谁？ 下面new 的那个 s
}

var s = new Student('Tom', 29, 14000);
console.log(s.name, s.age, s.price);

// 实际上没没有继承，只是借用了函数，简化代码而已
// 继承实际上是需要借用父类的方法
// 而这种方式根本没有父类

// 于是产生了 原型链+借用构造函数的组合继承


对应视频：
对应笔记：JavaScript_Advance\work\03_对象高级\02_继承模式\02_借用构造函数继承.html



### 组合继承

方式3： 原型链+借用构造函数的组合继承
  1. 利用原型链实现对父类型对象的方法继承
  2. 利用call()借用父类型构造函数初始化相同属性

function Person (name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.setName = function (name) {
  this.name = name;
}

function Student(name, age, price) {
  Person.call(this, name, age);   // 为了得到属性
  this.price = price
}

// 这个时候通过call方法，实现了省略 属性代码的 重复编写
// 但这个时候还是远远不够的，因为 Student 跟 Person 完全没有关系
// 因此 Student 的实例 也无法通过原型链 使用 Person 的属性/方法

Student.prototype = new Person();   // 为了能看到父类型的方法 (主要的)
Student.prototype.consturctor = Student;    // 修正 consturctor (次要的)

Student.prototype.setPrice = function (price) {
  this.price = price;
}

var s = new Student('Tom', 22, 15000);
s.setName('Bob');
s.setPrice(16000);
console.log(s.name, s.age, s.price);



// 这个组合继承和 extends 感觉还是有点区别的
console.log(Student.__proto__ === Person, Student.__proto__ === Function.prototype);
// 感觉需要设置 Student.__proto__ = Person，这样就跟extends一样了？
class B {}
class A extends B {}
console.log(A.__proto__ === B);
console.log(A.__proto__.__proto__ === Function.prototype);
console.log(B.__proto__ === Function.prototype);



对应视频：
对应笔记：JavaScript_Advance\work\03_对象高级\02_继承模式\03_组合继承.html



## 线程机制与事件机制


### 定时器引发的思考

1.定时器真是定时执行的吗？
  定时器并不能保证真正定时执行
  一般会延迟一丁点(可以接受)，也有可能延迟很长事件(不能接受)

2.定时器回调函数是在分线程执行的吗？
  在主线程执行的，js是单线程的

3.定时器是如何实现的？
  事件循环模型(后面讲)

document.getElementById('btn').onclick = function () {
  var start = Date.now(); // 这是H5新增的方法
  console.log('启动定时器前...');
  setTimeout(function () {
    console.log('定时器启动了', Date.now() - start);
  }, 200);
  console.log('启动定时器后...');

  // 上面的代码执行看起来事件相差不大
  // 做一个长时间的工作
  // 下面这段代码分别注释放开看看效果
  for (var i = 0; i < 100000000; i += 1) {}
}

// 这时会发现定时器根本不准，相差太大了
// 由此，这里引申出了 ==> 事件循环机制


对应视频：
对应笔记：JavaScript_Advance\work\04_线程机制与事件机制\03_定时器引发的思考.html


### JS是单线程的

1.如何证明 js 执行的单线程的？
  setTimeout() 的回调函数是在主线程执行的
  定时器回调函数只有在运行栈中的代码全部执行完才有可能执行

2.为什么js要用单线程模式，而不用多线程模式？
  Javascript的单线程，与它的用途有关
  作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM
  这决定了它只能是单线程，否则会带来很复杂的同步问题

3.代码的分类：
  初始化代码(同步代码)
  回调代码(异步代码)

4.js引擎执行代码的基本流程
  限制性初始化代码：包含一些特别的代码    回调函数(异步执行)
      设置监听器
      绑定事件监听
      发生ajax请求
  后面在某个时刻才会执行回调代码


对应视频：
对应笔记：JavaScript_Advance\work\04_线程机制与事件机制\04_JS是单线程的.html

 
### 事件循环模型

1.所有代码分类
  初始化执行代码(同步代码)：包含绑定DOM事件监听，设置定时器，发送ajax请求的代码
  回调执行代码(异步代码)：处理回调逻辑

2.js引擎执行代码的基本流程
  初始化代码 ===> 回调代码

3.模型的2个重要组成部分
  事件(定时器/DOM/Ajax)管理模块
  回调队列

4.模型的运转流程
  执行初始化代码，将事件回调函数及其数据添加到回调队列中
  当事件发生时，管理模块会将回调函数及其数据添加到回调队列中
  只有当初始化代码执行完毕后(可能要一定时间)，才会遍历读取回调队列中的回调函数执行

5.查看Event Loop图解


// callback queue 有很多叫法
// 任务队列：task quque
// 消息队列：message quque
// 事件队列：event quque
// 上面的三种说法，其实对应的都是同一个概念： callback queue


// 事件轮询就是 event loop
// 这里的轮询是
// 从任务队列中循环取出回调函数放入执行栈中处理(一个接一个)(这里针对的是任务队列；也就是callback queue)

// 事件驱动模型：就是整个那张图


// JS是在浏览器的主线程执行的
// 浏览器的分线程处理延时与监听，并放入队列等待主线程执行初始化代码



// http://www.ruanyifeng.com/blog/2014/10/event-loop.html
// 这是阮一峰的 事件循环 讲解，视频里的图这个文章里面有(2014年就有了)
// 但是感觉阮一峰讲的也不是很全面透彻？
// 另外
// 这个视频教学是2017年5月份的，不知道这个时候有没有宏任务和微任务的说法？
// 引入宏任务和微任务，这个event loop就很好理解了
// 可能视频和阮一峰那个时候应该还没有promise？因此event loop 的讲解没有更全面的引入宏任务和微任务？
// 同时同步代码和异步代码的说法更被大家广泛接受(之前都是叫做初始化代码和回调代码)？


// 一开始是只有 任务和微任务 (task 和 microtask)，并没有宏任务这一说法
// 后来，宏任务(macrotask) 的说法是从 Promise/ A+ 的标准里面流传出来的


对应视频：
对应笔记：JavaScript_Advance\work\04_线程机制与事件机制\05_事件循环模型.html


### 内存溢出与内存泄漏

1.内存溢出
  一种程序运行出现的错误
  当程序运行需要的内存超过了剩余的内存时，就会抛出内存溢出的错误

2.内存泄漏
  占用的内存没有及时释放
  内存泄漏积累多了就容易导致内存溢出
  常见的内存泄漏：
    意外的全局变量
    没有及时清理的计算器或回调函数
    闭包

// 1. 内存溢出
var obj = {};
// for (var i = 0; i < 10000; i += 1) {
//     obj[i] = new Array[100000];
//     console.log('------');
// }



// 2. 内存泄漏
  // 意外的全局变量

function fn() {
  a = 3;  // 函数内部没有var 的新变量，会变为全局变量
  console.log(a);
}

fn();

  // 没有及时清理的计算器或回调函数
var intervalId = setInterval(() => {
  console.log('-------');
}, 1000);

// clearInterval(intervalId);

  // 闭包
function fn1() {
  var a = 4;
  function fn2() {
    console.log(++a);
  };
  return fn2;
};

var f = fn1();



对应视频：
对应笔记：JavaScript_Advance\work\补充\03_内存溢出与内存泄漏.html




