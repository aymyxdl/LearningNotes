
一、 generator(生成器)

常规函数只会返回一个单一值。
而 Generator 可以按需一个接一个地返回（“yield”）多个值。它们可与 iterable 完美配合使用，从而可以轻松地创建数据流。



Generator 函数
要创建一个 generator，我们需要一个特殊的语法结构：function*，即所谓的 “generator function”。

它看起来像这样：

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}



与普通函数相比二者有如下区别:

普通函数使用 function 声明，生成器函数用 function*声明
普通函数使用 return 返回值，生成器函数使用 yield 返回值
普通函数是 run to completion 模式，即普通函数开始执行后，会一直执行到该函数所有语句完成，在此期间别的代码语句是不会被执行的；生成器函数是 run-pause-run 模式，即生成器函数可以在函数运行中被暂停一次或多次，并且在后面再恢复执行，在暂停期间允许其他代码语句被执行


迭代器 和 生成器 的关系
function* 定义的东西叫做 迭代器的生成器(简称生成器), 因为调用它返回一个迭代器。



二、使用案例

1.给普通对象添加遍历器
let obj = {
    name:'zhangsan',
    age:18,
    sex:'man'
}
for(var value of obj){
  console.log(value);//报错 obj is not iterable
}
console.log([...obj]);//报错 obj is not iterable


一个普通的对象obj默认是没有遍历器的，意味着不能使用for…of遍历，且不能使用…操作符解构。
可见都是报错obj is not iterable，我们通过Generator函数给其添加遍历器。

let obj = {
    name:'zhangsan',
    age:18,
    sex:'man'
}
obj[Symbol.iterator]=function* (){
    for(var key in obj){
        yield obj[key];
    }
}
for(let value of obj){
    console.log(value);//zhangsan 18 man
}
console.log([...obj]);//["zhangsan", 18, "man"]



-----


2.将ajax请求转成类似的 let a = ajax()的同步赋值形式
经常碰见一个业务内多个请求串联依赖，即后者依赖前者的请求结果，目前只能有3种做法，

回调函数嵌套
使用promise的.then进行链式调用
但现在我们学习了Generator函数后可以有第三种选择
将前一个网络请求的返回值赋值给一个变量，在下一个请求中使用
即以下形式：

let a = 请求1(){}
let b = 请求2(a){}


eg：

let res = 0;
//封装一个网络请求函数，不做实际动作，就打印一下参数param
function ajaxMy(method,url,param,varibal){
    console.log('调用ajax', param);
    //使用延时计时器模拟网络请求1秒后返回正确结果response
    setTimeout(function(){
        let response = res++;
        console.log('我要传参了：', response)
        varibal.next(response);         // 核心是要把这个迭代器放到异步返回的处理中进行调用
    },300)
}

let k;
let tell = function* (){
    //网络请求1
    let a = yield ajaxMy('get','www.baidu.com',10,k);
    console.log(a);//0      第一个为0 是因为 res++, 先赋值0，再自增为1
    //网络请求2
    let b = yield ajaxMy('get','www.baidu.com',a,k);
    console.log(b);//1
    //网络请求3
    let c = yield ajaxMy('get','www.baidu.com',b,k);
    console.log(c);//2
    //网络请求4
    let d = yield ajaxMy('get','www.baidu.com',c,k);
    console.log(d);//3
}
k = tell()
k.next();




关于next传参

k.next()  // 第一次调用返回的是 第一个yield后面的表达式，但是这个函数没有返回值，也就是默认 undefined,因此结果是 { value: undefined, done: false}
但是因为ajaxMy会通过参数 k 去继续调用.next(), 而且这个时候传参了，这个时候的参数0，就作为第一个yield赋值为左边的a



3.实现状态机
4.实现轮询
5.异步操作的同步化表达（处理异步操作，改写回调函数）
6.通过Generator函数部署Ajax操作
7.通过 Generator 函数逐行读取文本文件。

后续的我都没看
https://blog.csdn.net/qq_39903567/article/details/115188020



