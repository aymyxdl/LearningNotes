视频地址：https://www.bilibili.com/video/BV1MJ41197Eu




视频名称：
尚硅谷Promise教程(promise前端进阶)




这个视频教程分为两步：

1.教你如何使用以及为什么使用promise
2.从无到有一步一步实现promise（手写promise或者自定义promise）








# P2 实例对象与函数对象

区别实例对象与函数对象

1. 实例对象: new 函数产生的对象, 称为实例对象, 简称为对象
2. 函数对象: 将函数作为对象使用时, 简称为函数对象




# P3 二种类型的回调函数（同步和异步）

什么是回调函数：需要满足三个条件

1.我自己定义的
2.我没有亲自调用
3.最终执行了

所以，setTimeout不是回调函数



1.同步回调: 
  理解: 立即执行, 完全执行完了才结束, 不会放入回调队列中
  例子: 数组遍历(forEach)相关的回调函数 / Promise的excutor函数

2.异步回调: 
  理解: 不会立即执行, 会放入回调队列中将来执行
  例子: 定时器回调 / ajax回调 / Promise的成功|失败的回调



# P4 常见的内置错误
# P5 错误的处理（捕获与抛出）

JS中的Error
  1.错误的类型
    Error: 所有错误的父类型
    ReferenceError: 引用的变量不存在
    TypeError: 数据类型不正确的错误
    RangeError: 数据值不在其所允许的范围内
    SyntaxError: 语法错误

  2.错误处理
    捕获错误: try ... catch
    抛出错误: throw error

  3.错误对象
    message属性: 错误相关信息
    stack属性: 函数调用栈记录信息




uncaught: 表示没有捕获error, 下面的代码不会执行（也就是代码没有写在try catch里面）




# P6 promise的理解


1.抽象表达: 
  Promise是JS中进行异步编程的新的解决方案(旧的是谁?)

2.具体表达:
  从语法上来说: Promise是一个构造函数
  从功能上来说: promise对象用来封装一个异步操作并可以获取其结果






拓展：
面试 2 + 2 + 1 原则：

2个问题超过其他人，或者超过面试官预期
2个问题一般般，和别人差不多
1个问题答不出来

这样基本面试就没问题了




# P7 promise的状态和状态改变

promise有三种状态：pending、resolved(fullfilled)、rejected



promise的状态改变(只有2种改变方式, 只能改变一次)
  1.pending 变为 resolved
  2.pending 变为 rejected


说明: 只有这 2 种, 且一个 promise 对象只能改变一次
无论变为成功还是失败, 都会有一个结果数据
成功的结果数据一般称为 vlaue, 失败的结果数据一般称为 reason





# P8 promise的基本运行流程

1                                        new Pormise()  （pending状态）

.                                                     ↓

2                                                执行异步操作


.                            (成功，执行resolved)              (失败，执行rejected)
.                                     ↓                               ↓

.                        (promise对象变为resolved状态)     (promise对象变为rejected状态)
3                              回调onResolved()                 回调onRejected()
.                                 .then()                     .then() / .catch()



4                                            返回新的promise对象





# P9 promise的基本使用


// 1. 创建一个新的promise对象
const p = new Promise((resolve, reject) => {// 执行器函数  同步回调
  console.log('执行 excutor')
  // 2. 执行异步操作任务
  // 3.1. 如果成功了, 调用resolve(value)
  // 3.2. 如果失败了, 调用reject(reason)
})


p.then(
  value => { // 接收得到成功的value数据    onResolved
  },
  reason => {// 接收得到失败的reason数据  onRejected
  }
)


--------



# P10 为什么要用promise

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




/* 
  2.2. 使用promise的链式调用解决回调地狱
 */

情景：需要first的结果给second，second的结果给thrid

first()
  .then(function(result) {
    return second(result)
  })
  .then(function(newResult) {
    return third(newResult)
  })
  .then(function(finalResult) {
    console.log('Got the final result: ' + finalResult)
  })
  .catch(failureCallback)         // 统一处理异常（异常传透：如何实现，要看源码看原理）



/* 
  2.3. async/await: 回调地狱的终极解决方案
*/
  async function request() {
    try {
      const result = await first()
      const newResult = await second(result)
      const finalResult = await third(newResult)
      console.log('Got the final result: ' + finalResult)
    } catch (error) {
      failureCallback(error)
    }
  }






# P11 promise的API说明
# P12 promise的API说明
# P13 promise的API说明



1.Promise构造函数: Promise (excutor) {}
  excutor函数: 同步执行  (resolve, reject) => {}
  resolve函数: 内部定义成功时我们调用的函数 value => {}
  reject函数: 内部定义失败时我们调用的函数 reason => {}
  说明: excutor会在Promise内部立即同步回调,异步操作在执行器中执行

2.Promise.prototype.then方法: (onResolved, onRejected) => {}
  onResolved函数: 成功的回调函数  (value) => {}
  onRejected函数: 失败的回调函数 (reason) => {}
  说明: 指定用于得到成功value的成功回调和用于得到失败reason的失败回调
        返回一个新的promise对象

3.Promise.prototype.catch方法: (onRejected) => {}
  onRejected函数: 失败的回调函数 (reason) => {}
  说明: then()的语法糖, 相当于: then(undefined, onRejected)

4.Promise.resolve方法: (value) => {}
  value: 成功的数据或promise对象
  说明: 返回一个成功/失败的promise对象

5.Promise.reject方法: (reason) => {}
  reason: 失败的原因
  说明: 返回一个失败的promise对象

6.Promise.all方法: (promises) => {}
  promises: 包含n个promise的数组
  说明: 返回一个新的promise, 只有所有的promise都成功才成功, 只要有一个失败了就直接失败

7.Promise.race方法: (promises) => {}
  promises: 包含n个promise的数组
  说明: 返回一个新的promise, 第一个完成的promise的结果状态就是最终的结果状态



---

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功的数据')     // 这里只会成功调用resolve，因为pending只能改变一次
    reject('失败的数据')
  }, 1000)
}).then(
  value => {
    console.log('onResolved()1', value)
  }
).catch(
  reason => {
    console.log('onRejected()1', reason)
  }
)


.then().catch()   // 成功失败不写在一起


---

new Promise((resolve, reject) => {
  ...
}).then(
  value => {
    console.log('onResolved()1', value)
  },
  reason => {
    console.log('onRejected()1', reason)
  }
)


.then(onResolve, onRejected)    // 成功失败写在一起，这两种方法都行

---


const p3 = Promise.reject(3)
p3.then(null, reason => {console.log(reason)})    // 用then或catch捕获失败都可以
p3.catch(reason => {console.log(reason)})         // 直接使用catch捕获失败，写一个回调就行






---


Promise.all([])

// 传递的参数，是一个promise的数组

// 当成功时，values 也是一个数组，返回结果的顺序就是请求参数的顺序
// 当失败时，reason 就是失败的那个promise



---

Promise.race([])

// 传递的参数，也是一个promise的数组

race的用法，是根据你数组中第一个完成的状态来确定的

如果第一个完成的promise，成功了，那就是resolve

如果第一个完成的promise，失败了，那就是rejected







# P14 promise的几个关键问题
# P15 promise的几个关键问题
# P16 promise的几个关键问题
# P17 promise的几个关键问题
# P18 promise的几个关键问题


1.如何改变promise的状态?

(1) resolve(value): 如果当前是 pendding 就会变为 resolved
(2) reject(reason): 如果当前是 pendding 就会变为 rejected
(3) 抛出异常: 如果当前是 pendding 就会变为 rejected     // 上面两个方式很多人知道，这个抛出异常很少人知道



const p = new Promise((resolve, reject) => {
  // resolve(1) // promise变为resolved成功状态
  // reject(2) // promise变为rejected失败状态
  // throw new Error('出错了') // 抛出异常, promse变为rejected失败状态, reason为 抛出的error
  throw 3 // 抛出异常, promse变为rejected失败状态, reason为 抛出的3
})




2.一个promise指定多个成功/失败回调函数, 都会调用吗?

当 promise 改变为对应状态时都会调用


p.then(
  value => {},
  reason => {console.log('reason', reason)}
)
p.then(
  value => {},
  reason => {console.log('reason2', reason)}
)


这里用p对象写了2个 .then()
它们在p的状态改变时都会调用：意思就是这里失败后，会进两次失败的回调（如果是成功，那进2次成功）




3.改变promise状态和指定回调函数谁先谁后?


(1)都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调
(2)如何先改状态再指定回调?
  ①在执行器中直接调用resolve()/reject()
  ②延迟更长时间才调用then()
(3)什么时候才能得到数据?
  ①如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
  ②如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据



// 常规: 先指定回调函数, 后改变的状态
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1) // 后改变的状态(同时指定数据), 异步执行回调函数
  }, 1000);
}).then(// 先指定回调函数, 保存当前指定的回调函数
  value => {},
  reason => {console.log('reason', reason)}
)


---

// 如何先改状态, 后指定回调函数
new Promise((resolve, reject) => {
  resolve(1) // 先改变的状态(同时指定数据)
}).then(// 后指定回调函数, 异步执行回调函数
  value => {console.log('value2', value)},
  reason => {console.log('reason2', reason)}
)


---

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1) // 后改变的状态(同时指定数据), 异步执行回调函数
  }, 1000);
})

setTimeout(() => {
  p.then(
    value => {console.log('value3', value)},
    reason => {console.log('reason3', reason)}
  )
}, 1100);



---
注意


new Promise(执行器函数)
  .then(
    value => {},
    reason => {console.log('reason', reason)}
  )


执行器函数是同步执行的
.then()也是同步执行的

只不过.then 里面的 回调函数是异步执行的




4.promise.then()返回的新promise的结果状态由什么决定?

(1)简单表达: 由then()指定的回调函数执行的结果决定(上一个结果来决定)
(2)详细表达:
    ①如果抛出异常, 新promise变为rejected, reason为抛出的异常
    ②如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值（一定是resolved状态）
    ③如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果 





new Promise((resolve, reject) => {
  resolve(1)
}).then(
  value => {
    console.log('onResolved1()', value)       // 先进这里 1
  },
  reason => {
    console.log('onRejected1()', reason)
  }
).then(
  value => {
    console.log('onResolved2()', value)       // 再进这里 undefined
  },
  reason => {
    console.log('onRejected2()', reason)
  }
)


---




new Promise((resolve, reject) => {
  reject(2)
}).then(
  value => {
    console.log('onResolved1()', value)
  },
  reason => {
    console.log('onRejected1()', reason)       // 先进这里 2
  }
).then(
  value => {
    console.log('onResolved2()', value)       // 还是进这里 undefined
  },                                          // 因为有返回值，而不是明确的reject() 或者抛出异常
  reason => {
    console.log('onRejected2()', reason)
  }
)


---





5.promise如何串连多个操作任务?

(1)promise的then()返回一个新的promise, 可以开成then()的链式调用
(2)通过then的链式调用串连多个同步/异步任务



 new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("执行任务1(异步)")
    resolve(1)
  }, 1000);
}).then(
  value => {
    console.log('任务1的结果: ', value)
    console.log('执行任务2(同步)')
    return 2
  }
).then(
  value => {
    console.log('任务2的结果:', value)
    // 启动任务3(异步)
    setTimeout(() => {                    // 这里有没有问题？
      console.log('执行任务3(异步))')
      resolve(3)
    }, 1000);
  }
).then(
  value => {
    console.log('任务3的结果: ', value)
  }
)







6.promise异常传(穿)透?
  (1)当使用promise的then链式调用时, 可以在最后指定失败的回调, 
  (2)前面任何操作出了异常, 都会传到最后失败的回调中处理


new Promise((resolve, reject) => {
  // resolve(1)
  reject(1)
}).then(
  value => {},
  // reason => {throw reason}         // 不写相当于写了个这个
  // reason => throw reason           // 不能这样写会报错
).then(
  value => {},
  reason => {throw reason}
).then(
  value => {},
  reason => Promise.reject(reason)
).catch(reason => {
  console.log('onReejected1()', reason)
})

箭头 => 第一个作用是定义匿名函数，第二个作用是return
所以相当于 return throw,所以会报错，需要 => { throw reason }

箭头相当于return作用的前提是，右边不能紧跟大括号
如果跟了大括号，就相当于函数体的标记







7.中断promise链?
  (1)当使用promise的then链式调用时, 在中间中断, 不再调用后面的回调函数
  (2)办法: 在回调函数中返回一个pendding状态的promise对象


new Promise((resolve, reject) => {
  reject(1)
}).then(
  value => {},
).then(
  value => {},
).then(
  value => {},
  reason => Promise.reject(reason)
).catch(reason => {
  console.log('onReejected1()', reason)
  // throw reason
  // return Promise.reject(reason)
  return new Promise(() => {}) // 返回一个pending的promise  中断promise链
  // return new Promise((r) => {r(1)}) // 这样不会被阻塞
  
}).then(
  value => {
    // 如果上面的 catch 不return，则进入这里，相当于 return undefined
    console.log('onResolved3()', value)
  },
  reason => {
    // throw reason
    // return Promise.reject(reason)
    // throw 或 reject 进入这里
    console.log('onReejected2()', reason)
  }
)








# P19 自定义(手写)promise



一个整体的promise包括几个部分

1.构造函数
2.then 方法和 catch
3.resolve 和 reject
4.all 和 race
5.自己扩展的方法




记住：千万要搞清楚不同的方法的参数，可别搞混了

构造函数 的参数是一个执行器函数
then方法的参数 是两个异步回调函数， onResolved onRjected
catch方法的参数 是一个异步回调函数， onRejected
resolve方法的参数 是一个结果，用来给成功的回调传递结果 value
reject方法的参数 是一个结果，用来给失败的回调传递结果 reason
all方法的参数 是一个promise数组
race方法的参数 是一个promise数组




# P20 整体结构

首先，es5中 用es6的export 或者 cmd 的导出是不能直接使用的（需要编译）
那么在es5中怎么导出函数？

IIFE

(function () {})()


=>

(function (window) {
  function Promise(executor) {}

  // 如何向外暴露？很简单
  window.Promise = Promise
})(window)



然后，我们要确定Promise上面有哪些功能


----

Promise原型对象

then 和 catch都是写在原型对象上面的
而且它们的参数都是 函数类型

Promise.prototype.then = function(onResolved, onRejected) {}


// catch 只有一个参数
Promise.prototype.catch = function(onRejected) {}


----


Promise函数对象

resolve 和 reject 都是在函数对象上的

Promise.resolve = function(value) {}

Promise.reject = function(reason) {}



all 和 race 也都是在函数对象上的

Promise.all = function(promises) {}

Promise.race = function(promises) {}


----




于是，整体的结构写出来就是：


/* 
自定义Promise函数模块: IIFE
*/
(function (window) {

  /* 
  Promise构造函数
  excutor: 执行器函数(同步执行)
  */
  function Promise(excutor) {
    
  }

  /* 
  Promise原型对象的then()
  指定成功和失败的回调函数
  返回一个新的promise对象
  */
  Promise.prototype.then = function (onResolved, onRejected) {

  }

  /* 
  Promise原型对象的catch()
  指定失败的回调函数
  返回一个新的promise对象
  */
  Promise.prototype.catch = function (onRejected) {

  }

  /* 
  Promise函数对象的resolve方法
  返回一个指定结果的成功的promise
  */
  Promise.resolve = function (value) {
    
  }

  /* 
  Promise函数对象的reject方法
  返回一个指定reason的失败的promise
  */
  Promise.reject = function (reason) {
      
  }

  /* 
  Promise函数对象的all方法
  返回一个promise, 只有当所有proimse都成功时才成功, 否则只要有一个失败的就失败
  */
  Promise.all = function (promises) {
      
  }

  /* 
  Promise函数对象的race方法
  返回一个promise, 其结果由第一个完成的promise决定
  */
  Promise.race = function (promises) {
        
  }

  // 向外暴露Promise函数
  window.Promise = Promise
})(window)






# P21 自定义promise_构造函数实现1
# P22 自定义promise_构造函数实现2
# P23 自定义promise_构造函数测试和完善



这里老师的视频少讲了一些东西，感觉是觉得核心，讲给花钱的人听，录屏的就不给听


const PENDING = 'pending'
const RESOLVED = 'resovled'
const REJECTED = 'rejected'

/* 
Promise构造函数
excutor: 执行器函数(同步执行)
*/
function Promise(excutor) {
  // 将当前promise对象保存起来
  const self = this
  self.status = PENDING // 给promise对象指定status属性, 初始值为pending
  self.data = undefined // 给promise对象指定一个用于存储结果数据的属性
  self.callbacks = [] // 每个元素的结构: { onResolved() {}, onRejected() {}}

  function resolve (value) {
    // 如果当前状态不是pending, 直接结束
    if (self.status!==PENDING) {
      return
    }

    // 将状态改为resolved
    self.status = 'resolved'
    // 保存value数据
    self.data = value
    // 如果有待执行callback函数, 立即异步执行回调函数onResolved
    if (self.callbacks.length>0) {
      setTimeout(() => { // 放入队列中执行所有成功的回调
        self.callbacks.forEach(calbacksObj => {
          calbacksObj.onResolved(value)
        }) 
      });
    }

  }

  function reject (reason) {
    // 如果当前状态不是pending, 直接结束
    if (self.status!==PENDING) {
      return
    }

    // 将状态改为rejected
    self.status = REJECTED
    // 保存value数据
    self.data = reason
    // 如果有待执行callback函数, 立即异步执行回调函数onRejected
    if (self.callbacks.length>0) {
      setTimeout(() => { // 放入队列中执行所有成功的回调
        self.callbacks.forEach(calbacksObj => {
          calbacksObj.onRejected(reason)
        }) 
      });
    }
  }
  
  // 立即同步执行excutor
  try {
    excutor(resolve, reject)
  } catch (error) { // 如果执行器抛出异常, promise对象变为rejected状态
    reject(error)
  }
}






# P24 自定义promise_then方法实现1
# P25 自定义promise_then方法实现2
# P26 自定义promise_then方法实现3



记住，then里面的函数不能直接调用，要异步执行



onResolved = typeof onResolved==='function' ? onResolved : value => value // 向后传递成功的value
// 指定默认的失败的回调(实现错误/异常传透的关键点)
onRejected = typeof onRejected==='function' ? onRejected : reason => {throw reason} // 向后传递失败的reason


这两个默认处理挺重要的



















