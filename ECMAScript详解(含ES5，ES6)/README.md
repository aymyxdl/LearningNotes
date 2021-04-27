# ECMAScript详解(含ES5，ES6) 知识点



## 严格模式


严格模式(strict mode): 使得Javascript在更严格的语法条件下运行

目的：消除 JS 语法的一些不合理、不严谨之处，减少一些怪异行为，消除代码运行的一些不安全之处，

语法和行为改变：
  1.  必须用var声明变量
  2.  禁止自定义的函数中的this指向window
  3.  创建eval作用域
  4.  对象不能有重名的属性

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es5\01_严格模式.html

  
## json对象

JSON对象是 ES5 的语法

1. JSON.stringify(obj/arr)： js对象(数组) 转换为 json对象(数组)
2. JSON.parse(json)： json对象(数组) 转换为 js对象(数组)

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es5\02_JSON对象.html


## Object扩展

ES5 给 Object 扩展了一些静态方法，常用的2个：

1. Object.create(prototype, [descriptors])
2. Object.defineProperties(object, descriptors)

Object.create(prototype, [descriptors])
  作用：以指定对象为原型创建新的对象
  为新的对象指定新的属性，并对属性进行描述
    value：指定值
    writable：标识当前属性值是否可修改，默认为false
    configurable：标识当前属性是否可以被删除，默认为false
    enumerable：标识当前属性是否能用for in 枚举，默认为false

var obj = {username: 'damu', age: 30};
var obj3 = Object.create(obj, {
  sex: {              
    value: 'male',
    writable: true,
    enumerable: true,
    configurable: true,
  }
});




Object.defineProperties(object, descriptors)
  作用：为指定对象定义扩展多个属性
    get：用来获取当前属性值的回调函数
    set：监听当前属性值的回调函数(属性值发生变化会自动调用)，调用后会将修改后的值作为实参注入到 set 函数

    存取器属性：setter，getter 一个用来存值，一个用来取值
    (说是叫getter,setter,其实就是get方法, set方法)

// 通过 Object.defineProperties 设置的扩展属性，不能通过一般的方式进行赋值

var obj5 = {firstName: 'kobe', lastName: 'bryant'};
Object.defineProperties(obj5, {
  fullName: {
    get: function () { // 获取扩展属性的值
      // 获取扩展属性的值的时候,get方法自动调用
      console.log('get()');
      return this.firstName + ' ' + this.lastName;
    },
    set: function (data) {  // 监听扩展属性，当扩展属性发送变化的时候会自动调用
      // 自动调用后,会将变化的值作为实参注入到set函数
      console.log('set()', data);
      var names = data.split(' ');
      this.firstName = names[0];
      this.lastName = names[1];
    }
  }
})





对象本身的两个方法(相当于 defineProperties 的简写)
  get propertyName() {}：用来得到当前属性值的回调函数
  set propertyName() {} ：用来监听当前属性值变化的回调函数

  
  这两种写法不同但是结果是完全相同的。
  (就是Object.defineProperties 设置属性的时候,用的就是这两个方法)

var obj2 = {
  firstName: 'curry',
  lastName: 'stephen',
  get fullName () {
    return this.firstName + this.lastName;
  },
  set fullName (data) {
    var names = data.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}



对应视频：
对应笔记：
ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es5\03_1_Object扩展.html
ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es5\03_2_Object扩展.html




## Array扩展

1. Array.prototype.indexOf(value)：得到值在数组中的第一个下标
2. Array.prototype.lastIndexOf(value)：得到值在数组中的最后一个下标
3. Array.prototype.forEach(function(item, index) {})：遍历数组
4. Array.prototype.map(function(item, index) {})：遍历数组返回一个新的数组，返回加工之后的值
5. Array.prototype.filter(function(item, index) {})：遍历过滤出一个新的子数组，返回条件为true的值

上面的这些方法都是给 Array 实例用的
因为放在了Array的显示原型上

forEach map filter 是ES5的
find是 ES6的



对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es5\04_Array扩展.html





## function扩展

Function.prototype.bind(obj)
  作用：将函数内的 this 绑定为 obj，并将函数返回

面试题：区别 bind()、call() 和 apply()：
  都能指定函数中的 this
  bind() 是将函数返回
  call()/apply() 是立即调用函数

  call() 的参数是一个个依次传递，用逗号分开(第二个参数开始就是原方法的参数，第一个是obj对象)
  apply()的参数第二个是数组(所有参数放在数组中)
  bind()的参数和call一样


那么既然方式和call一样，为什么还要多此一举弄个bind呢？
答：在回调中使用

比如定时器, 一般情况下，这个回调的this是window
setTimeout(function() {
    console.log(this);
}, 1000)

但是有时候我希望这个this是别的，该怎么办？
setTimeout(function() {
    console.log(this);
}.bind(obj), 1000)      // 简直就是秒



对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es5\05_Function扩展.html



## let

1.作用：
  与var类似，用于声明一个变量

2.特点：
  在块级作用域内有效
  不能重复声明
  不会预处理，不存在变量提升

3.应用：
  循环遍历加监听
  使用let取代var是趋势


在 let 关键字之前，因为for循环中的变量不能实时保存到回调函数中，最终所有回调函数中的i都会是最后的i
那个时候都是用闭包来解决这个问题
for (var i = 0, length = btns.length; i < length; i += 1) {
  (function (i) {
    btns[i].onclick = function () {
      console.log(i);
    }
  })(i);
}

有了let后，因为在块级作用域内有效
for (let i = 0, length = btns.length; i < length; i += 1) {
  btns[i].onclick = function() {
    console.log(i);
  }
}


另外：注意 let 不会预处理，不存在变量提升



对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\01_let关键字.html



## const

1.作用：
  定义一个常量

2.特点：
  不能修改
  其他特点同 let

3.应用：
  保存不用改变的数据



对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\02_const关键字.html




## 解构赋值

1.理解
  从对象或数组中提取数组，并赋值给变量（多个）

2.对象的解构赋值：
  let {n, a} = {n: 'tom', a:12}

3.数组的解构赋值：
  let [a, b] = [1, 'atguigu']

4.用途
  给多个形参赋值


对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\03_变量的解构赋值.html


## 模板字符串

1.模板字符串(模板字变量)：简化字符串的拼接
  必须用``包含（反引号）
  变化的部分使用 ${xxx} 定义



对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\04_模板字符串.html


## 对象的简写形式

const name = 'Ming', age = '18', city = 'Shanghai';
//ES6
const student = {
  name, // 同名的属性可以省略不写
  age,
  city,
  getName() { // 可以省略函数的function，包括冒号
    return this.name;
  }
};


对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\05_简化的对象写法.html



## 箭头函数

基本语法：
  没有参数：() => console.log('xxxx')
  一个参数：i => i+2
  大于一个参数：(i, j) => i+j
  函数体不用大括号：默认返回结果
  函数体如果有多个语句，需要用{}包围，若有需要返回的内容，需要手动返回

箭头函数的特点：
  1.简洁
  2.箭头函数没有自己 this，箭头函数的 this 不是调用的时候决定的，而是在定义的时候处在的对象就是它的 this
  3.扩展理解：箭头函数的 this 看外层的是否有函数
    如果有，外层函数的 this 就是内部箭头函数的 this(如果外层还是箭头函数，继续向外找)
    如果没有，则 this 是 window


箭头函数的重点就是this

注意：
1.箭头函数没有this，只能继承。箭头函数不能作为对象方法使用。
2.向外查找的时候，是查找外层的函数，对象不算


对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\06_箭头函数.html



## 扩展运算符（三点运算符）

扩展运算符 也可以叫 三点运算符
在使用展开功能的时候， 又可以叫展开运算符


1.rest(可变)参数
  用来取代 arguments，但比 arguments 灵活，只能是最后部分形参参数

  因为 arguments 是个伪数组，没有其它数组的方法，只有length，所以用数组的 forEach 之类的方法会报错
  而 ... 收集的参数是个数组，可以使用数组的方法，更加灵活

2.展开运算符
  提取数组或对象中的属性值

注意，展开运算符是 浅拷贝


对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\07_点点点运算符.html


## 形参默认值

形参默认值 ---- 当不传入参数的时候默认使用形参里的默认值

function Point(x = 1, y = 2) {
  this.x = x;
  this.y = y;
}


对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\08_形参默认值.html



## promise

1.理解：
  Promise 对象：代表了未来某个将要发生的事件（通常是一个异步操作）
  有了 promise 对象，可以将异步操作以同步的流程表达出来，避免了层层嵌套的回调函数（回调地狱）
  ES6的 Promise 是一个构造函数，用来生成 Promise 实例

2.使用 promise 基本步骤（2步）：
  第一步：创建 promise 对象
    let promise = new Promise((resolve, reject) => {
      // 初始化promise状态为 pending
      // 执行异步操作
      if (异步操作成功) {
        resolve(value); // 修改promise的状态为fullfilled
      } else {
        reject(value); // 修改promise的状态为rejected
      }
    });

  第二步：调用 promise 的 then()
    promise.then(
      result => {
        // ...
      },
      reason => {
        // ...
      }
    )


promise 对象的3个状态
  pending ：初始化状态
  fullfilled（resolved）：成功状态
  rejected：失败状态


new Promise(执行器函数)
执行器函数 也就是 (resolve, reject) => {}
它是同步的，也就是代码从上面执行下来，会直接执行执行器函数里面的代码
在里面碰到了异步任务，再将异步任务放到任务队列中


then方法有两种写法
一种是成功失败都写在then里面
一种是成功写在then，失败写在catch

p.then(
  (result) => {},   // 第一个是成功的回调
  (reason) => {}    // 第二个是失败的回调
)

p
  .then((result) => {})   // then里面的是成功
  .catch((reason) => {})  // catch里面的是失败


09_promise过程分析 里面的练习题可以做一下，相当于面试题了
(重写了代码：AllPractice\vue3-create-project-default\src\components\axios\AxiosTest.vue)



这里的promise讲的比较浅，可以看一下其它的视频：讲的很深：
https://www.bilibili.com/video/BV1MJ41197Eu




对应视频：
对应笔记：
ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\09_promise对象.html
ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\09_promise过程分析.html



## Symbol

ES5中对象的属性名都是字符串，容易造成重名，变量污染
Symbol：
  概念：ES6中的添加了一种原始数据类型(已有的原始数据类型，String, Number, boolean, null, undefined, 对象)
  特点：
    Symbol 属性值对应的值是唯一的，解决命名冲突问题
    Symbol 值不能与其他数据进行计算，包括同字符串拼串
    for in，for of 遍历时不会遍历 symbol 属性


内置 Symbol 值
  除了使用自己定义的 Symbol 值以外，ES6 还提供了11个内置 Symbol 值，指向语言内部使用的方法：
  Symbol.iterator：
    对象的 Symbol.iterator 属性，指向该对象的默认遍历方法


个人觉得现在Symbol 用的最多的还是 Symbol.iterator



对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\10_Symbol.html




## Iterator

概念：iterator 是一种接口机制，为各种不同的数据结构提供统一的访问机制

作用：
  1. 为各种数据结构，提供一个统一的、简便的访问接口
  2. 使得数据结构成员能够按某种次序排列
  3. ES6 创造了一种新的遍历命令 for of 循环，Iterator 接口主要供 for of 消费

  工作原理：
    * 创建一个指针对象（遍历器对象），指向数据结构的起始位置
    * 第一次调用 next 方法，指针自动指向数据结构的第一个成员
    * 接下来不断调用 next 方法，指针会一直往后移动，直到指向最后一个成员
    * 每调用 next 方法返回的是一个包含 value 和 done 的对象，{value: 当前成员的值, done: 布尔值}
      value 表示当前成员的值，done 对应的布尔值表示当前的数据的结构是否遍历结束
      当遍历结束的时候返回的 value 值是 undefined，done 值为 true
  
  原生具备 iterator 接口的数据（可用for of遍历）
  for ... of 遍历的时候
  内部其实就是隐式的调用next(),封装了而已，对用户透明


  扩展理解：
    1. 当数据结构上部署了 Symbol.iterator 接口，该数据就是可以用 for of 遍历
    2. 当使用 for of 去遍历目标数据的时候，该数据会自动去找 Symbol.iterator 属性
      // Symbol.iterator 属性指向对象的默认遍历器方法

      Array
      arguments
      set 容器
      map 容器
      String



//  模拟指针对象(遍历器对象)
function myIterator(arr) {  // iterator 接口
  let i = 0;  // 记录指针的位置
  return {  // 遍历器对象
    next: function () {
      return {
        value: arr[i++],
        done: i > arr.length,
      }
    }
  }
}

object不可以使用 for of 遍历（因为它没有部署iterator接口）
但是我们可以手动给他添加 iterator 接口

在指定的数据结构上部署了iterator接口后
那么在调用 for of去遍历某一个数据解构的时候,首先去找Symbol.iterator,
找到了就去遍历,没有找到的话不能遍历 xxx is not iterable



let targetData = {
  name: 'test',
  age: 12,
  gender: 'male',
  [Symbol.iterator]: function () {
    let i = 0;  // 记录指针的位置
    return {  // 遍历器对象
      next: () => {
        const arr = Object.values(this);
        // const arr = Object.keys(this);
        // 这边使用 keys, values 都可以
        // 不过对应下面的取值的时候要注意
        // console.log(arr);
        return {
          value: arr[i++],
          // value: this[arr[i++]],
          done: i > arr.length,
        }
      }
    }
  }
}

for(let i of targetData) {
  console.log(i);
}

这个时候用 for of 或者手动调用next() 就都可以了

let obj2 = targetData[Symbol.iterator]();
console.log(obj2.next());




问题：如何自己手动调用具有 iterator 接口 的next()方法


const arr = [1, 2, 3, 4, 5, 6];
let arr1 = arr[Symbol.iterator]();
console.log(arr1);
console.log(arr1.next());



问题：for of  和 for in 的区别

for of 遍历 可迭代对象 上面定义的 要迭代的数据
for in 遍历 数据的 可枚举属性。

简单的来讲 for in 遍历的是 key值
for of 遍历的是 value

for in 循环会把原型上添加的属性遍历出来
for of 不会


因为for of 不能遍历对象，经常和 Object.values() 来配合使用，遍历对象
for (let i of Object.values(obj)) {
  console.log(i)
}



更深层次的讲
for of 的实现 是因为数据结构上部署了 iterator 接口

而迭代器接口，除了供 for of 消费外
更多的是和 Generator 生成器 配合使用 来解决 异步编程

不过后面ES8 提出了 async await
所以，生成器也不用了
因此，iterator 更多的是用来供 for of 消费来进行 遍历



(代码测试)
AllProject\vue3-create-project-default\src\components\iterator\Next.vue




对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\11_Iterator遍历器.html




## generator

Generator函数
  概念：
    1. ES6 提供的解决异步编程的方案之一
    2. Generator 函数是一个状态机，内部封装了不同状态的数据
    3. 用来生成遍历器对象
    4. 可暂停函数（惰性求值），yield 可暂停，next 方法可启动。每次返回的是 yield 后的表达式结果

  特点：
    1. function 与函数名之间有一个星号
    2. 内部用 yield 表达式来定义不同的状态
    3. generator 函数返回的是指针对象（iterator），而不会执行函数内部逻辑
    4. 调用 next 方法函数内部逻辑开始执行，遇到 yield 表达式停止，返回{value: yield 后的表达式结果/undefined, done:true/false}
    5. 再次调用 next 方法会从上一次停止时的 yield 处开始，直到最后
    6. yield 语句返回结果通常为 undefined，当调用 next 方法时传参内容会作为启动时（上一个）yield 语句的返回值



知识点1：（了解语法结构）

function* gen() {
  console.log(1);
  // yield { a: "123", b: [1, 2, 3, 4] };
  // yield true;
  yield;
  console.log(2);
  yield;
  console.log(3);
}

需要接收函数返回的对象（返回的是指针对象）
通过调用 指针对象 的 next()方法，才会开始执行 生成器函数内部的代码
调用一次，代码执行到下一个yield处


next() 方法返回的就是 迭代器的next的返回值，封装成对象的形式
{value: yield 后的表达式结果/undefined, done:true/false}



知识点2：之前给对象部署iterator接口使用闭包的方式
这里配合 generator生成器 来部署iterator接口


const obj = {
  name: 'Tom',
  age: '15',
  gender: 'male',
  [Symbol.iterator]: function * () {
    let i = 0;
    const arr = Object.values(this);
    yield arr[i++];
    yield arr[i++];
    yield arr[i++];
  }
}

for (let i of obj) {
  console.log(i);
}

// 不过这样有隐患：yield写死了就返回三次，如果后续添加了属性，就不能 of 出来了



知识点3：使用生成器来实现异步编程


代码就不写了，因为感觉冗余太严重了，代码极度混杂，而且多嵌套两层，就会出问题
局限性太大


(代码测试)：
vue3-create-project-default\src\components\generator\Generator.vue




对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\10_Symbol.html


## async


async函数(ES2017： ES8)
  概念：真正意义上去解决异步回调的问题，同步流程表达异步操作
  本质：Generator的语法糖(我一开始以为是promise的语法糖)
  语法：
    async function foo() {
      await 异步操作;
      await 异步操作;
    }

  特点：
    1. 不需要像 Generator 去调用 next 方法，遇到 await 等待，当前的异步操作完成就往下执行
    2. 返回的总是 Promise 对象，可以用 then 方法进行下一步操作
    3. async 取代 Generator 函数的星号，await 取代 Generator 的 yield
    4. 语意上更为明确，使用简单




async返回的是 promise对象(不管你是否自己返回promise对象，它都会给你封装),不过一般也不会在async里面返回代码
一般都是async 里面使用 await，而await 右边的函数一般都是返回promise
然后await 又会帮你转换，把这个promise拆解掉，把里面你需要的内容返回给你，无需你关心如果处理promise对象



(代码测试)：
vue3-create-project-default\src\components\async\AsyncFun.vue

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\10_Symbol.html




## class


    1. 通过 class 定义类/实现类的继承
    2. 在类中通过 constructor 定义构造方法
    3. 通过 new 来创建类的实例
    4. 通过 extends 来实现类的继承
    5. 通过 super 调用父类的构造方法
    6. 重写从父类中继承的一般方法

类的一般方法，这些方法都会放在 类 的原型上 (Person.prototype)
calss 里面必须用方法的简写形式


知识点： extends

子类和父类的关系
继承在原型链中的关系就是
  子类的原型对象 是 父类的实例（也就意味着 子.prototype.__proto__ === 父.prototype）

还有一个很特别的关系就是
  子.__proto__ === 父

  这个关系感觉就有点不合理，有点强行赋予的感觉
  因为 实例的隐式原型 等于 构造函数的显示原型
  按理一般来说，多少会等于显示原型吧，这里直接就等于父类了


class Person {
  constructor() {}
}

class SubPerson extends Person {
  constructor() {
    super();
  }
}

const p2 = new SubPerson();
console.log(p2);

console.log(p2.__proto__ === SubPerson.prototype);
console.log(p2.__proto__.__proto__ === Person.prototype);
console.log(p2.__proto__.__proto__.__proto__ === Object.prototype);
console.log(p2.__proto__.__proto__.__proto__.__proto__ === null);

console.log('***********');

console.log(SubPerson.__proto__ === Person);
console.log(SubPerson.prototype.__proto__ === Person.prototype);
console.log(Person.__proto__ === Function.prototype);


// 其它的都能理解，唯独这个很特别 SubPerson.__proto__ === Person
// 因为一般来说 实例的隐式原型 等于 构造函数的显示原型




(代码测试)：
vue3-create-project-default\src\components\class\ClassCom.vue

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\常用\14_class.html



## 字符串扩展

新增的几个字符串的方法

  1. includes(str)：判断是否包含指定的字符串
  2. startsWith(str)：判断是否以指定字符串开头
  3. endsWith(str)：判断是否以指定字符串结尾
  4. repeat(count)：重复指定次数

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\其它\01_字符串扩展.html

## 数值的扩展

  1. 二进制与八进制数值表示法：二进制用0b，八进制用0o
  2. Number.isFinite(i)：判断是否是有限大的数
  3. Number.isNaN(i)：判断是否是NaN
  4. Number.isInteger(i)：判断是否是整数
  5. Number.parseInt(str)：将字符串转换为对应的数值
  6. Math.trunc(i)：直接去除小数部分

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\其它\02_数值的扩展.html


## 数组的扩展

  1. Array.from(v)：将伪数组对象或可遍历对象转换为真数组
  2. Array.of(v1, v2, v3)：将一系列值转换成数组
  3. find(function(value, index, arr) {return true})：找出第一个满足条件返回 true 的元素
  4. findIndex(function(value,index,arr) {return true})：找出第一个满足条件返回 true 的元素下标

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\其它\03_数组的扩展.html

## 对象扩展


    1. Object.is(v1,v2)：判断2个数据是否完全相等
    2. Object.assign(target,source1,source2..)：
        将源对象的属性复制到目标对象上
    3. 直接操作__proto__属性：
        let obj2 = {};
        obj2.__proto__ = obj1;

注意： Object.assign() 是浅拷贝


(代码测试)：
vue3-create-project-default\src\components\clone\ObjectAssign.vue

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\其它\04_对象扩展.html



## 深度克隆

知识点1：什么是深拷贝，什么是浅拷贝


知识点2：

拷贝数据：
    基本数据类型：
        拷贝后会生成一份新的数据，修改拷贝后的数据不会影响原数据

    对象/数组
        拷贝后不会生成新的数据，而是拷贝的引用，修改拷贝后的数据会影响原来的数据

  拷贝数据的方法：

    1. 直接赋值给一个变量     // 浅拷贝
    2. Object.assign()      // 浅拷贝
    3. Array.prototype.concat()   // 浅拷贝
    4. Array.prototype.slice()    // 浅拷贝
    5. JSON.parse(JSON.stringify()) // 深拷贝（拷贝的数据里不能有函数，处理不了）

  浅拷贝(对应的都是对象/数组)
    特点：拷贝的引用，修改拷贝以后的数据会影响原数据，使得原数据不安全
  深拷贝(深度克隆)
    特点：拷贝的时候生成新的数据，修改拷贝以后的数据不会影响原数据



JSON为什么可以实现深克隆？
因为 stringify 已经转成了 字符串，类型都变了
另外处理不了函数是因为 JSON.stringify 本来就是要求你放入原生的 对象或者数组



扩展：


思考：如何实现深度拷贝(克隆)


如何判断数据类型： arr---> Array, null ---> Null
    1. typeof返回的数据类型： string, number, boolean, object, function, undefined // 都是小写
    2. Object.prototype.toString.call(obj)： 
        [object String]  [object Null]  [object Undefined]  [object Number]
        [object Boolean]  [object Object] [object Array]  [object Function] // 这后面的是大写开头的
        两种常用方式获取类型：截取字符串或者分割字符串
          str.slice(8, -1);
          str.split(' ')[1].split(']')[0]

// 定义检测数据类型的功能函数
function checkedType(target) {
  return Object.prototype.toString.call(target).slice(8, -1);
}

// 实现深度克隆  ---> 针对的是对象/数组
function clone(target) {
  // 判断拷贝的数据类型
  // 初始化变量result 称为最终克隆的数据
  let result, targetType = checkedType(target);

  if(targetType === 'Object') {
    result = {};
  } else if (targetType === 'Array') {
    result = [];
  } else {
    // 这里function会不会有问题
    return target;
  }

  // 遍历目标数据
  for(let i in target) {
    // 获取遍历数据解构的每一项值
    // 判断目标解构里的每一项的值是否是对象/数组
    result[i] = clone(target[i]);
  }
  return result;
}



(代码测试)：
vue3-create-project-default\src\components\clone\DeepClone.vue

对应视频：
对应笔记：ECMAScript详解(含ES5，ES6)\ES5_6_7\study\es6\其它\05_深度克隆.html



## ES7的新增功能

1.指数运算符：**
2.Array.prototype.includes(value): 判断数组在是否包含指定value

2 ** 3 // 2的三次方，等于8

[1,2,3,4,5].includes(2)












