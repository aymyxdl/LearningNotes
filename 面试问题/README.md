## H5和CSS3有哪些新增加的特性

H5的新特性：
canvas
video和audio
本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；sessionStorage 的数据在浏览器关闭后自动删除
语义化标签
表单

CSS3的新特性：

选择器
  基本选择器
  属性选择器
  伪类选择器

弹性盒模型
透明度

圆角(border-radius)
阴影(box-shadow)
边框图片(border-image)

渐变
  linear-gradient()：线性渐变。
  radial-gradient()：径向渐变。

变换(transform)

动画(animation)

word-wrap(允许长单词换行到下一行)

@font-face(引入字体)

  指定名为"myFirstFont"的字体，并指定在哪里可以找到它的URL：
  @font-face
  {
  font-family: myFirstFont;
  src: url('Sansation_Light.ttf'),
      url('Sansation_Light.eot'); /* IE9 */
  }


## requirejs

requirejs 就是 AMD

因为刚开始 commonjs只在服务器端用(nodejs使用),没有浏览器的使用方法
于是 AMD出了浏览器使用模块的API
后来commonjs才出的

define 暴露模块
require 引入模块

设置引入的模块名对应哪个文件
requirejs.config({
  paths: {
    app: '../app'
  }
})


另外,要通过 script 标签上的 data-main 属性来设置 入口文件
<script data-main="./js/main.js" src="./js/libs/require.js"></script>




## 在框架出现之前，模块化编程的区别

commonjs(也就是node)

requirejs(AMD)

seajs(CMD)

es6的模块化


最开始出现的是commonjs，但是一开始的commonjs只有服务器端(node)的模块化

于是出现了 requirejs

再然后是阿里内部员工自己搞的 seajs


这里 AMD CMD 都是标准 然后 requirejs 和 seajs 都是浏览器端的实现


nodejs的模块化
module.exports = function() {
  // ...
}

var hello = require('./hello')



## es6的 set 和 map

都是es6新增的 数据结构（新的数据类型）

都要通过 new 构造函数得到

Map：

Map和Object的区别:

1. 一个Object 的键只能是字符串或者 Symbols，但一个Map 的键可以是任意值。
2. Map中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。
3. Map的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。
4. Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

Map对象上的方法：
set()
get()
has()
delete()
clear()
size()


Set：

set可以存任何类型的值，类似于数组，但是成员的值都是唯一的，没有重复的值。

set对象的方法：
add()
has()
delete()
clear()
size()


注意：
set不能通过下标取出数据
如果要获取数据的话，只能通过接收 values()的返回值
然后通过 next() 方法获取
map也可以这样，不过map有get方法，所以没必要这样做





map和set都有遍历方法

keys()      // 键名
values()    // 键值
entries()   // 键值对


forEach()   // 本身也都可以使用forEach

// 这里需要注意的是,因为之前一直使用forEach遍历数组
// 然后我总认为forEach(item, index) 这里第二个参数是索引
// 然后对map用了 forEach 以后才恍然大悟
// 第二个参数并不是索引，而是 key，只是数组的key就是他们的索引顺序
// 所以才会认为index是索引(索引是表象，key是本质)
// forEach(value, key)

然后都可以使用for of 遍历
// 两者直接使用for of 等同于 entries()

set 的 keys() values() 返回值完全一样




## for of  和 for in 的区别

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


--总结
区别

1.推荐在遍历对象的时候使用for in ,在遍历数组的时候使用for of 。
2.for in 循环出的是key（并且key的类型是string）,for of 循环出的是value。
3.for of 是es6引新引入的特性，修复了es5引入的for in 的不足。
4.for of 不能循环普通的对象，需要通过Object.keys搭配使用。



## 数组和伪数组的区别

伪数组 只有length 属性，而没有数组的一些方法

常见伪数组：
1. arguments
2. DOM 对象列表（比如通过 document.getElementsByTags 得到的列表）
3. jQuery 对象（比如 $("div")）


有的人说 伪数组 其实就是对象
用Object.prototype.toString.call() 会得到 [object Object]

但是我这里使用
const dom1 = document.getElementsByTagName('body');
Object.prototype.toString.call(dom1)
结果是：
[object HTMLCollection]


## 如何将类数组 转成 真数组

Array.form()



## ts中的泛型

在定义函数或是类时，如果遇到类型不明确就可以使用泛型

因为TS是必须明确类型的，但是有的时候，你的方法或者类
确实是不确定要传什么类型，这个时候可以使用泛型
在定义的时候指定泛型
然后在实际调用的时候，再明确传入的类型格式


## ts中继承和接口的区别



接口用来定义一个类结构的
用来定义一个类中应该包含哪些属性和方法


接口可以在定义类的时候去限制类的结构
接口中的所有的属性都不能有实际的值
接口只定义对象的结构，而不考虑实际值

继承接口：
和类一样，接口也可以相互继承
这让我们能够从一个接口里复制成员到另一个接口里
可以更灵活地将接口分割到可重用的模块里。


但是继承和接口本身并没有什么关联和区别

感觉这个问题应该是想问 类 和 接口的区别


接口：去定义一个类的数据格式 (虚的，抽象的)
类：声明并实现方法  (实际实现的)


## vue组件传值有几种方法

1. props/$emit
2. eventBus
3. Vuex
4. provide/inject
5. ref
6. localStorage/sessionStorage
7. $children/$parent
8. $attrs与$listeners




## vuex 有几个部分构成的，有几个核心部分？，做了些什么

State
Getters
Mutations
Actions
Modules


核心部分：
1. state：包含了store中存储的各个状态。
2. getter: 类似于 Vue 中的计算属性，根据其他 getter 或 state 计算返回值。
3. mutation: 一组方法，是改变store中状态的执行者，只能是同步操作。
4. action: 一组方法，其中可以包含异步操作


## router-link 如何传参

直接在标签上传递参数

可以写成 query
或者param

## vue的生命钩子

vue2:
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeDestroy
destroyed


vue3:
(setup取代了 beforeCreate 和 created)
onBeforeMount
onMounted
onBeforeUpdate
onUpdated
onBeforeUnmount
onUnmounted


onActivated
onDeactivated
onErrorCaptured


## vue的生命周期

vue每个组件都是独立的
每个组件都有一个属于它的生命周期
从一个组件创建、数据初始化、挂载、更新、销毁
这就是一个组件所谓的生命周期

生命周期中的不同状态对应不同的生命周期钩子


## fetch

js原生提供的异步请求


## 原型和原型链

简单的来说就是
通过对象的隐式原型属性
找到其构造函数的显示原型对象

把这一系列向上查找拼接起来的就是原型链

这就是为什么对象上可以使用很多我们没有定义的方法/属性

[].forEach()
{}.toString()

## promise如何批量处理异步操作

Promise.all()


## cookie session localstorage sessionStorage

session 存放在服务器
剩下的都放在浏览器本地

cookie如果不设置生命周期，关闭浏览器就会消失
cookie相比较不安全

cookie在浏览器和服务器间来回传递

sessionStorage：仅在当前浏览器窗口关闭之前有效
localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据
cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭

sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；
localstorage在所有同源窗口中都是共享的；
cookie也是在所有同源窗口中都是共享的 


https://www.cnblogs.com/jing-tian/p/10991431.html




## 前端如何优化网站性能？
1. 减少http请求
2. 使用字体图标(IconFont)
3. 使用打包工具合并css和js文件
4. 使用懒加载(无需一次完全加强页面的所有内容)
5. 控制资源文件加载优先级(css在头部，js在底部)
6. 利用浏览器缓存
7. 减少重排(reflow)：尽量使用 增加class属性，而不是通过style操作样式
8. 减少DOM操作

## 请描述浏览器渲染页面的工作步骤


1.根据html文件构建DOM树和CSSOM树。
构建DOM树期间，如果遇到JS，阻塞DOM树及CSSOM树的构建，优先加载JS文件，
加载完毕，再继续构建DOM树及CSSOM树。

2.构建渲染树（Render Tree）。

3.页面的重绘（repaint）与重排（reflow，也有称回流）。
页面渲染完成后，若JS操作了DOM节点，根据JS对DOM操作动作的大小，浏览器对页面进行重绘或是重排。


重绘:
当元素的一部分属性发生改变，如外观、背景、颜色等不会引起布局变化，只需要浏览器根据元素的新属性重新绘制
使元素呈现新的外观叫做重绘。 

重排（回流）:当render树中的一部分或者全部因为大小边距等问题发生改变而需要DOM树重新计算的过程

重绘不一定需要重排（比如颜色的改变），重排必然导致重绘（比如改变网页位置）



## vue生命周期的 updated 阶段中，修改data里面的数组，会造成死循环

因为在 beforeUpdate 声明周期之前
这个时候 虚拟DOM 就已经更新好了，但是还没有上树，也就是没有重新渲染(真实DOM还没有发生改变)
然后你在 updated 这里你修改数据，就又会发生数据的更新，导致虚拟DOM重新更新
这样就形成了死循环


只有在update里面修改数组才会发生死循环(beforeUpdate不会)

数据操作在methods，DOM操作在更新阶段，是比较妥的。

另外，不是修改数组导致死循环

而是监听的对象的值发生了变化，然后导致一直死循环
如果只是 改变 a[0] = 100;
这样只会循环一次，因为改成了100后，updated中再进来，还是和原来的100一样，没有变化
就不会更新虚拟dom，就不会死循环

vue2,vue3都测过，只有updated里面才会死循环


(代码测试)
AllProject\vue3-create-project-default\src\components\mianshi\updatedLoop.vue



## vue哪个修饰符阻止冒泡发生

stop 阻止事件冒泡

prevent 阻止事件的默认行为

capture 阻止捕获

完整的事件机制是：捕获阶段--目标阶段--冒泡阶段。



## 冒泡和捕获的区别

点击事件从 
子元素一级一级向父元素传递：冒泡
父元素一级一级向子元素传递：捕获




## 清除浮动

为什么要清除浮动？

清除浮动主要是为了解决，父元素因为子级元素浮动引起的内部高度为0的问题


eg:
给父盒子设置一个boder
内部放两个盒子一个big 一个small
未给big和small设置浮动，则他们会默认撑开父盒子


当给内部两个盒子加上float属性的时候

因为父元素没有高度，设置了浮动后，父元素又会变为高度0(视觉上就是一条线)


总结一下：

当父元素不给高度的时候，
内部元素不浮动时会撑开
而浮动的时候，父元素变成一条线



清除浮动的方法（最常用的4种）

1.在父元素内部最后面添加一个空div 
<div class="clear"><!-- 额外标签法 --></div>

.clear {
  // 额外标签法：不推荐
  clear: both;
}


如果我们清除了浮动，父元素自动检测子盒子最高的高度，然后与其同高。
优点：通俗易懂，方便
缺点：添加无意义标签，语义化差
不建议使用。


2.父级添加overflow属性
父元素添加overflow:hidden（不推荐）
通过触发BFC方式，实现清除浮动

.father {
  overflow: hidden;
}


缺点：
内容增多的时候容易造成不会自动换行导致内容被隐藏掉
无法显示要溢出的元素


3.使用after伪元素清除浮动（推荐使用）

.father:after{
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear:both;
  visibility: hidden;
}
.father{
  *zoom: 1;
  /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}

优点：符合闭合浮动思想，结构语义化正确
缺点：ie6-7不支持伪元素：after，使用zoom:1触发hasLayout.
推荐使用


4.使用before和after双伪元素清除浮动

.clearfix:after,
.clearfix:before{
  content: "";
  display: table;
}
.clearfix:after{
  clear: both;
}
.clearfix{
  *zoom: 1;
}


优点：代码更简洁
缺点：用zoom:1触发hasLayout.
推荐使用



(代码测试)
AllProject\vue3-create-project-default\src\components\mianshi\updatedLoop.vue


## 如何实现0.5px

利用缩放
原理：transform:scale()来达到压缩一半的目的。

没有写代码测试

## JavaScript如何实现继承

原型链
构造函数
组合继承

## Jquery的核心实现




## 微任务 宏任务








## promise


面试 2 + 2 + 1 原则：

2个问题超过其他人，或者超过面试官预期
2个问题一般般，和别人差不多
1个问题答不出来

这样基本面试就没问题了



1.什么是promise

  1.抽象表达: 
    Promise是JS中进行异步编程的新的解决方案(旧的是谁?)

  2.具体表达:
    从语法上来说: Promise是一个构造函数
    从功能上来说: promise对象用来封装一个异步操作并可以获取其结果




2.promise有什么用

  1. 指定回调函数的方式更加灵活: 可以在请求发出甚至结束后指定回调函数
  2. 支持链式调用, 可以解决回调地狱问题


    1.
    旧的: 必须在启动异步任务前指定
    promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定)

    2.
    什么是回调地狱? 回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调函数执行的条件
    回调地狱的缺点?  不便于阅读 / 不便于异常处理
    解决方案? promise链式调用
    终极解决方案? async/await



回调函数嵌套会导致代码向右编程
promise可以链式编程




