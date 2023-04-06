

1.promise的状态和状态改变

promise有三种状态：pending、resolved(fullfilled)、rejected



promise的状态改变(只有2种改变方式, 只能改变一次)
  1.pending 变为 resolved
  2.pending 变为 rejected


说明: 只有这 2 种, 且一个 promise 对象只能改变一次
无论变为成功还是失败, 都会有一个结果数据
成功的结果数据一般称为 vlaue, 失败的结果数据一般称为 reason



----------


2.promise的基本运行流程


1                                        new Pormise()  （pending状态）

.                                                     ↓

2                                                执行异步操作


.                            (成功，执行resolved)              (失败，执行rejected)
.                                     ↓                               ↓

.                        (promise对象变为resolved状态)     (promise对象变为rejected状态)
3                              回调onResolved()                 回调onRejected()
.                                 .then()                     .then() / .catch()



4                                            返回新的promise对象


----------



3.promise的基本使用


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



----------


4.使用promise的链式调用解决回调地狱(不过一般不这么用，更多的使用async await)


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



----------



5.promise如何链式调用（里面怎么写异步代码）(实现链式调用的关键就是需要返回一个promise对象)


new Promise((resolved, rejected) => {
  setTimeout(() => {    // 异步代码
    resolved(1)
  }, 1000);
}).then(data => {
  console.log(data)
  return new Promise((resolved, rejected) => {
    setTimeout(() => {    // 异步代码
      resolved(2)
    }, 2000);
  })
}).then(data => {
  console.log(data)
  return new Promise((resolved, rejected) => {
    setTimeout(() => {    // 异步代码
      resolved(3)
    }, 3000);
  })
}).then(data => {
  console.log(data)
  return new Promise((resolved, rejected) => {
    setTimeout(() => {    // 异步代码
      console.log(4)
      resolved(4);
    });
  })
})


----------

6.promise的异常穿透是什么？
就是在promise的链式调用的最后catch，这样中途所有的异常报错都会在这里捕获，没有成功的地方就会跳过中间的then，直达catch


----------

7.promise的一些方法


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
    



前面几个挺简单，讲一下all 和 race



Promise.all([])

// 传递的参数，是一个promise的数组

// 当成功时，values 也是一个数组，返回结果的顺序就是请求参数的顺序
// 当失败时，reason 就是失败的那个promise



Promise.all可以将多个Promise实例包装成一个新的Promise实例。
同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值。


let p1 = new Promise((resolve, reject) => {
  resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
  resolve('success')
})

let p3 = Promse.reject('失败')

Promise.all([p1, p2]).then((result) => {
  console.log(result)               //['成功了', 'success']   : 结果是请求顺序的数组
}).catch((error) => {
  console.log(error)
})

Promise.all([p1,p3,p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)      // 失败了，打出 '失败'               : 结果是失败的那个结果
})


Promise.all获得的成功结果的数组里面的数据顺序和Promise.all接收到的数组顺序是一致的，
即p1的结果在前，即便p1的结果获取的比p2要晚。
这带来了一个绝大的好处：在前端开发请求数据的过程中，偶尔会遇到发送多个请求并根据请求顺序获取和使用数据的场景，
使用Promise.all毫无疑问可以解决这个问题。







---

Promise.race([])

// 传递的参数，也是一个promise的数组

race的用法，是根据你数组中第一个完成的状态来确定的

如果第一个完成的promise，成功了，那就是resolve

如果第一个完成的promise，失败了，那就是rejected


解析：
顾名思义，Promse.race就是赛跑的意思，意思就是说，Promise.race([p1, p2, p3])里面哪个结果获得的快，
就返回那个结果，不管结果本身是成功状态还是失败状态。


let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  },1000)
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([p1, p2]).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)  // 打开的是 'failed'
})




----------


8.后续的API扩展了一些新方法



Promise.allSettled
Promise.any
try
done



Promise.allSettled()
会返回所有参数的状态与返回值


let p1 = Promise.resolve("成功")
let p2 = "foo"
let p3 = Promise.reject("失败1")
let p4 = Promise.reject("失败2").catch(
  res => {
    console.log("自己的" + res);
    return res              // 参数有自己的catch时，状态为fulfilled
})

Promise.allSettled([p1, p2, p4]).then(val => {
  console.log(val);
})

Promise.allSettled([p2, p4, p3]).then(val => {
  console.log(val);
})


----
Promise.any()

Promise.any正好与Promise.all相反，有一个fulfilled状态就为fulfilled

let p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "p1接受")
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(reject, 1500, "p2拒绝")
})

let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, "p3接受")
})

Promise.any([p1, p2, p3])
  .then(val => {
      console.log(val);//p3接受
  })
  .catch(res => {
      console.log(res);
  })



如果全部为rejected则会抛出一个全部拒绝的错误

Promise.any([p2])
  .then(val => {
      console.log(val);
  })
  .catch(res => {
      console.log(res);//AggregateError: All promises were rejected
  })


----


Promise.prototype.done

1、then支持延续任务调用方式（Continuation tasks），而done不支持
比如then可以这样用，而done不可以：
promise().then().then().then() 

2、then会捕获未处理的异常然后把错误状态作为返回值返回，而done则会把异常直接抛出









=====================



1.async await 的使用方法

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


2.如何保证await 右边的函数中的异步代码全部执行完毕再返回

比如下面的代码我想要顺序执行
test - 1
A - 1
A - 2
A -----
test - 2


如何修改代码才能达到效果

function A () {
  console.log('A - 1');

  setTimeout(() => {
    console.log('A----');
  }, 1000);

  console.log('A - 2')
}

async function test() {
  console.log('test - 1');
  const result = await A();
  console.log('test - 2');
}

test();



------


function A () {
  console.log('A - 1');
  console.log('A - 2')

  return new Promise(resolved => {
    setTimeout(() => {
      console.log('A----');
      resolved('')
    }, 1000);
  })
}

async function test() {
  console.log('test - 1');
  const result = await A();
  console.log('test - 2');
}

test();


--------

同理：有多个 await 的情况，也能顺序执行


function A () {
  console.log('A - 1');
  console.log('A - 2')

  return new Promise(resolved => {
    setTimeout(() => {
      console.log('A----');
      resolved('')
    }, 1000);
  })
}

function B () {
  console.log('B - 1');

  return new Promise(resolved => {
    setTimeout(() => {
      console.log('B----');
      resolved('')
    }, 3000);
  })
}

function C () {
  console.log('C - 1');

  return new Promise(resolved => {
    setTimeout(() => {
      console.log('C----');
      resolved('')
    }, 5000);
  })
}

async function test() {
  console.log('test - 1');
  const result1 = await A();
  const result2 = await B();
  const result3 = await C();
  console.log('test - 2');
}

test();


------


结论：要实现 等待await右边的代码中的全部异步代码执行完毕后再往下面执行。
那么一定要配合 return new Promise() 来完成
将promise的结果放在异步回调中，这样就能实现效果。




