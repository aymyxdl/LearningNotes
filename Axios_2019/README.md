## HTTP相关复习

HTTP 请求交互的基本过程

1. 浏览器端向服务器发送 HTTP 请求(请求报文)
2. 后台服务器接收到请求后, 调度服务器应用处理请求, 向浏览器端返回 HTTP 响应(响应报文)
3. 浏览器端接收到响应, 解析显示响应体/调用监视回调

HTTP 请求报文

格式与参数

****
行      POST  /s?ie=utf-8  HTTP/1.1 
头      Host: atguigu.com
        Cookie: name=guigu
        Content-type: application/x-www-form-urlencoded
        User-Agent: chrome 83
空行
体      username=admin&password=admin
****


HTTP 响应报文
****
行      HTTP/1.1  200  OK
头      Content-Type: text/html;charset=utf-8
        Content-length: 2048
        Content-encoding: gzip
空行    
体      <html>
            <head>
            </head>
            <body>
                <h1>尚硅谷</h1>
            </body>
        </html>
****



get请求没有请求体(get请求的参数都是跟在url后面)
请求体只有post有，而且post必须要带请求参数才有

post 请求体参数格式：

  urlencoded格式         a=123&b=456
  json格式               {}
  ...

而对于不同的请求体的格式，后台需要做不同的处理方式
那么就应该协商好格式，如何协商呢？

通过请求头的 Content-Type 来设置 (固定的写法)

1.Content-Type: application/x-www-form-urlencoded;charset=utf-8
用于键值对参数，参数的键值用=连接, 参数之间用&连接
例如: name=%E5%B0%8F%E6%98%8E&age=12

2.Content-Type: application/json;charset=utf-8
用于 json 字符串参数
例如: {"name": "%E5%B0%8F%E6%98%8E", "age": 12}

3.Content-Type: multipart/form-data
用于文件上传请求
通常是base64码那种，上传图片或者文件


常见的响应状态码

* 200   OK
* 201   Created
* 401   Unauthorized  未授权
* 403   Forbidden 没有权限访问
* 404   not found
* 500   Internal Server Error 内部错误

不同类型的请求及其作用
1. GET: 从服务器端读取数据 
2. POST: 向服务器端添加新数据 
3. PUT: 更新服务器端已经数据 
4. DELETE: 删除服务器端数据

API 的分类
1.REST API: restful
  (1) 发送请求进行 CRUD 哪个操作由请求方式来决定 (crud是指在做计算处理时的增加(Create)、检索(Retrieve)、更新(Update)和删除(Delete)几个单词的首字母简写)
  (2) 同一个请求路径可以进行多个操作 
  (3) 请求方式会用到 GET/POST/PUT/DELETE 

2.非 REST API: restless 
  (1) 请求方式不决定请求的 CRUD 操作 
  (2) 一个请求路径只对应一个操作 
  (3) 一般只有 GET/POST

(一般项目开发中用到的更多的是 非 REST API)



## json-server

使用 json-server 搭建 REST API
注意：这里是搭建 REST API

npm install -g json-server

启动服务器执行命令: json-server --watch db.json

需要用db.json 来充当数据库存放数据


搭建好了服务后，就可以通过 rest api 的请求来进行访问了
比如使用axios:

axios.get();
axios.post();
axios.put();
axios.delete();


对应视频：
对应笔记：Axios_2019\work\code\http-ajax-axios\test_doitmyself\01_restapi.html



## XHR 的理解和使用

1. 使用 XMLHttpRequest (XHR)对象可以与服务器交互, 也就是发送 ajax 请求 
2. 前端可以获取到数据，而无需让整个的页面刷新。 
3. 这使得 Web 页面可以只更新页面的局部，而不影响用户的操作。

自己封装原生的 xhr 来进行ajax请求（模拟axios）

具体的看xhr.html(太多了，这里就不写了)

不过原生的 xhr 的四步不能忘记

var xhr = new XMLHttpRequest();
xhr.open();
xhr.send();
xhr.onreadystatechange = function() {}


对应视频：
对应笔记：Axios_2019\work\code\http-ajax-axios\test_doitmyself\02_xhr.html



## axios的使用

设置 baseURL，这样传参的时候只需要传接口的路径
axios.defaults.baseURL = 'http://127.0.0.1:3000';


axios.create():

axios.create(config)
  a. 根据指定配置创建一个新的axios, 也就就每个新axios都有自己的配置
  b. 新axios只是没有取消请求和批量发请求的方法, 其它所有语法都是一致的
  c. 为什么要设计这个语法?
    需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理
    解决: 创建2个新axios, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中

const instance = axios.create({
  baseURL: 'http://127.0.0.1:6666'
});


const instance2 = axios.create({
  baseURL: 'http://127.0.0.1:3000'
});



axios的拦截器

1. 说明: 调用 axios()并不是立即发送 ajax 请求, 而是需要经历一个较长的流程 
2. 流程: 请求拦截器2 => 请求拦截器 1 => 发ajax请求 => 响应拦截器1 => 响 应拦截器 2 => 请求的回调 
3. 注意: 此流程是通过 promise 串连起来的, 请求拦截器传递的是 config, 响应 拦截器传递的是 response



拦截器的优先级：
request的拦截器相当于栈，后进先出
response的拦截器相当于堆，先进先出



## 取消请求cancel()

cancel有两种写法
这里使用第二种


axios.get('路径', 配置对象)   // 格式

let cancel;   // 用于保存取消请求的函数

axios.get('url/123', {
  // cacelToken: new axios.CancelToken(function executor(c) {
  cacelToken: new axios.CancelToken((c) => {   // c 是用于取消当前请求的函数
    // 保存请求函数，用于之后可能需要取消当前请求
    cancel = c;
  })
})

// 执行取消请求的函数
// 可以传入message
cancel('取消强制请求');





## axios源码

index.js下面引用的实际上是lib下的文件


lib/adapters/xhr.js
源码目录下面的xhr.js 文件才是真正用来发送ajax请求的模块
封装的还是 XMLHttpRequest()


lib/adapters/http.js
axios既能在 浏览器发送ajax请求

也能在服务器发送http请求(这里不是我们关注的，我们关注浏览器的ajax功能)



总之，根据xhr.js来看
最终调用的还是 xhrAdapter函数
而且这个函数返回的是promise


-----

lib/cancel 这个目录下包含的是取消请求相关的模块


还有用来判断 error 是否是 Cancel类型
（之前讲的cancel类型忘了，补一下）


-----

lib/core/

Axios.js

Axios 不是 axios 的实例（因为Axios是函数）

Axios 从语法上 不是 axios 的实例
Axios 从功能上 是 axios 的实例


----

lib/defaults.js

跟默认配置相关的东西

比如：content-type


----
整体结构浏览下来

比较重要的：
axios.js
然后 axios.js 又跟 Axios.js 非常有关系
而 Axios.js 中的 request又和 dispatch(dispatchRequest.js) 和 intercept 有关

dispatch 里面又涉及了 adapter(xhr)




###　axios 与 Axios 的关系?
　
1. 从语法上来说: axios 不是 Axios 的实例 
2. 从功能上来说: axios 是 Axios 的实例 
3. axios 是 Axios.prototype.request 函数 bind()返回的函数 
4. axios 作为对象有 Axios 原型对象上的所有方法, 有 Axios 对象上所有属性

详解：
通过 axios.js 来看
axios 是调用函数 createInstance 的返回值
而 createInstance 里面的返回值的类型又是
var instance = bind(Axios.prototype.request, context);
// 上面的写法等同于 Axios.prototype.request.bind(context)
然后又去 Axios.js 里面大概过了一下 Axios.prototype.request
发现这个函数是用来发送请求的


回到 createInstance 
这个函数最终是调用 Axios.prototype.request
不过这里是通过bind调用的，而bind绑定的对象是 context
又发现 context 是 Axios的实例
因此，将来执行 request的 this 是谁？（Axios的实例）

至此，能看出来，axios是一个函数（对应的是 request）


下面的两个 utils.extend(自定义的工具函数)作用是将：
第二个参数对象里面的 方法/属性，拷贝到 第一个参数对象上面去

utils.extend(instance, Axios.prototype, context); 
这里两个对象都是方法， 因此都是拷贝方法
因此作用就是将 Axios.prototype 的方法拷贝到 axios上面去(instance 就是 axios)
// 拷贝了不少，主要就是 request()/get()/post()/put()/delete()
// 看了源码你就会发现，get()/post()/put()/delete()这些调用，最终都是走到了 request()

到了这里，axios(instance)上面就有了一些方法了，可以用来发请求
get/post/put/delete 用来发特定的请求
request可以发送所有的类型，本质上和 axios() 这样发送一样


utils.extend(instance, context);
然后又把 context上面的属性(因为context是实例)，拷贝到 axios上面去了
// 主要是 defaults 和 interceptors 这两个属性

这时候，axios有了 Axios 原型上的方法， 还有了 Axios的实例(context) 的属性
换句话说：也就是 axios 不仅有了实例属性，还有原型方法
所以，这不就相当于 axios 是 Axios 的实例吗？
所以我们前面说 从功能上来说: axios 是 Axios 的实例 
而且相对于 Axios实例来说， axios 还有个优势
就是 axios 本身还是个函数，因此可以 axios() 调用，而实例只能 实例.属性() 这样调用


axios具有 Axios的所有能力


###　instance 与 axios 的区别?

1. 相同: 
  1. 都是一个能发任意请求的函数: request(config) 
  2. 都有发特定请求的各种方法: get()/post()/put()/delete() 
  3. 都有默认配置和拦截器的属性: defaults/interceptors 
2. 不同: 
  1. 默认匹配的值很可能不一样 
  2. instance 没有 axios 后面添加的一些方法: create()/CancelToken()/all()

详解：


axios 上面有 create() 函数
发现 create() 实际上 调用的还是 createInstance(), 刚刚的流程又走了一遍
因此，我们可以认为 axios 是它默认 帮我们创建了一个 Axios的实例(功能上来讲)
而我们调用 create() 则是手动创建一个新的 Axios的实例

因此 instance(这里指的是 create() 的返回的实例) 和 axios 的基本能力都是相同的

不同的地方则是
默认配置,因为create通常会传入新的默认配置(也可以不传，但是不传，还不如直接用axios)
而且 instance 少了很多 axios后面新添加的属性/方法

注意：别忘了，这里的 instance 也是个函数




### axios 运行的整体流程


我们要想发请求，要么使用axios ，要么通过 axios.create() 产生的 instance

而无论是 axios，还是 instance，都是通过调用 createInstance 产生的函数(它们两个都是函数)
(直接用axios，也就是执行了一次 createInstance 的流程，要用instance，至少经过了两次 createInstance 的流程)

接着使用它们的时候
可以作为 函数执行
也可以作为 对象调用方法执行

调用的时候传入 config参数（内部会封装成配置）
最基本的两个：url，method
可能还有 data(data指定的是请求体的数据)
param(param指定的是 query查询参数)


这个时候，才执行发请求的方法
而请求方法，最后还是通过调用 Axios.prototype.request


然后去执行 请求拦截器(拦截器都是函数)
然后去找 dispatchRequest(分发请求)
再找 adapter(浏览器找xhr)

这几件事情都是通过 promise.then 的链式调用来串联起来的
这三件事后面会详细讲解，这里是了解整体流程


发了请求后，可能报错，也可能取消(cancel)

失败就是 rejected
成功就是 fulfilled(resolved)

然后进入响应拦截器

最后才到请求的 onResolved 或者 onRejected
(也就是自己的回调函数内部)


----

整体流程中，重要的有三个函数：

request(config) ==> dispatchRequest(config) ==> xhrAdapter(config)

有一个特点：都有config参数


先看 request(Axios.prototype.request)

前面的准备工作先不看，直接看

// Hook up interceptors middleware
var chain = [dispatchRequest, undefined];
var promise = Promise.resolve(config);

this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
  chain.unshift(interceptor.fulfilled, interceptor.rejected);
});

this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
  chain.push(interceptor.fulfilled, interceptor.rejected);
});

while (chain.length) {
  promise = promise.then(chain.shift(), chain.shift());
}

return promise;


-------
var promise = Promise.resolve(config);

这里首先产生一个成功的promise，把config传进去，那么后面所有的方法都是用到这个config

然后看chain，后面涉及到
var chain = [dispatchRequest, undefined];

这里先存放 dispatchRequest(另一个重要的函数) 和 undefined
这个 undefined 很精髓，后面需要用到

然后去找请求拦截器，取出所有的请求拦截器函数，塞到 chain 这个数组里面来

this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
  chain.unshift(interceptor.fulfilled, interceptor.rejected);
});

每一个拦截器都有2个函数，一个成功的回调，一个失败的回调
这里都取出来，放到chain中



这个时候，对我们透明的内部还有一个数组，用来存放请求拦截器(这里为了方便写requestInterceptors，其实就是 this.interceptors.request --> 看源码的 InterceptorManager handlers)
requestInterceptors: []

然后每定义一个请求拦截器，都会放进来一对回调(一个成功，一个失败),但是在一个对象中
这里模拟设定2个请求拦截器
requestInterceptors: [] ==>
requestInterceptors: [{fulfilled1(){}, rejected1(){}}] ==>
requestInterceptors: [{fulfilled1(){}, rejected1(){}}, {fulfilled2(){}, rejected2(){}}]

同样的，响应拦截器也是一样的：
responseInterceptors: [] ==>
responseInterceptors: [{fulfilled11(){}, rejected11(){}}] ==>
responseInterceptors: [{fulfilled11(){}, rejected11(){}}, {fulfilled22(){}, rejected22(){}}]


这个时候，再加上chain
chain: [dispatchRequest, undefined]


---

然后 this.interceptors.request.forEach 循环中通过 unshift
把 requestInterceptors 中的回调存到 chain 中




this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
  chain.push(interceptor.fulfilled, interceptor.rejected);
});

响应拦截器循环遍历中 通过 push 
将 responseInterceptors 中的回调存到 chain 中

因此变成了

chain: [
  fulfilled2, rejected2, fulfilled1, rejected1,   // 注意：这里因为是unshift,所以反而是后面的拦截器 到了最前面
  dispatchRequest, undefined
  fulfilled11, rejected11, fulfilled22, rejected22 // 注意：这里是 push，所以先进来的，还是在前面
]

整体来看
这里面，请求拦截器倒置了，响应拦截器还是原来的顺序


这个时候，数组准备好了，就需要形成一个promise链了


while (chain.length) {
  promise = promise.then(chain.shift(), chain.shift());
}


先通过前面的手动定义的成功的promise.then(), 取出chain中的2个元素(一次性去取2个)
从最前面开始取，分别设置为 promise 的成功和失败的回调

promise链回调: config
              => (fulfilled2, rejected2) => (fulfilled1, rejected1)
              => (dispatchRequest, undefined) // 这就是前面要放undefined的原因，不放就错位了
              => (fulfilled11, rejected11) => (fulfilled22, rejected22)

最后返回了这个 promise
然后 promise链的最后面，是我们自定定义的回调函数
              => (onResolved, onRejected)


-----

因此整体的promise链：
              config
              => (fulfilled2, rejected2) => (fulfilled1, rejected1)   // 请求拦截器处理
              => (dispatchRequest, undefined)                         // 发送请求，dispatchRequest 就是axios请求
              => (fulfilled11, rejected11) => (fulfilled22, rejected22) // 响应拦截器处理
              => (onResolved, onRejected)                             // axios发请求回调处理


此时，所有的处理都通过 promise链 串联起来了
这里再回头看，就会明白为什么 请求拦截器 后进先出
响应拦截器 先进先出


简单的总结就是：
promise通过它的链式调用，将 请求拦截器，发送请求的操作，响应拦截器，我们手写的回调 全部串联起来




### axios 的请求/响应拦截器是什么？

1.请求拦截器: 
  在真正发送请求前执行的回调函数 
  可以对请求进行检查或配置进行特定处理 
  成功的回调函数, 传递的默认是 config(也必须是) 
  失败的回调函数, 传递的默认是 error 

2.响应拦截器
  在请求得到响应后执行的回调函数 
  可以对响应数据进行特定处理 
  成功的回调函数, 传递的默认是 response 
  失败的回调函数, 传递的默认是 error



### dispatchRequest(config)

这里返回去仔细看一下 dispatchRequest(config)


简单的来讲：dispatchRequest 内部干了三件事

1.发送请求前，对请求数据进行格式转换
2.调用 xhrAdapter(config) 真正发送请求 
  // 这里要注意，发送 xhr 还是 http 请求看在浏览器还是服务器(node)
  // 另外，xhrAdapter 不解析数据
3.请求返回后，对响应的数据进行格式转换，然后返回 promise



转换数据：因为我们的数据可能是 json格式，也可以是urlencoded格式

dispatchRequest.js 中
通过 transformData 转换数据

config.data = transformData(
  config.data,
  config.headers,
  config.transformRequest
);


但是真正实际上是 transformRequest 来处理，而它又在 defaults.js 中

transformRequest 属性中

其它的我们不太关心，最主要的就是
if (utils.isObject(data)) {
  setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
  return JSON.stringify(data);
}

这里判断数据如果是一个对象，则设置 请求头的 content-type为 json 格式
并且转换数据为 json字符串


// 在实际场景中，如果后台只支持 urlencoded 格式的参数
那么我们在写参数的时候，还是可以传 对象格式的
然后添加一个 请求拦截器 处理这些数据就行了，因为，对开发者透明，不影响正常开发流程


因此，transformRequest(请求转换器)，重点的工作是什么？
答：将 对象类型的数据 转成成 json字符串，并设置json格式的请求头


转换完请求数据后
然后 dispatchRequest.js内部
通过 adapter去发送请求，一旦有了结果，根据结果类型调用 resolve或者reject

如果成功，又调用 transformResponse 去处理结果数据

transformResponse很简单

transformResponse: [function transformResponse(data) {
  /*eslint no-param-reassign:0*/
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) { /* Ignore */ }
  }
  return data;
}]


做的操作就是判断是否是字符串，如果是，则转成json对象

注意：这里面进行 try catch
因为有的字符串 不是 json字符串格式的，这样转换会报错
而这里catch 啥都不干(相当于啥都没有改变，忽略了，data还是原来的格式)
只是针对json格式的数据进行了转换

面试的时候会问：万一不是json格式呢？
回答：内部用了try catch ，catch后不做处理，数据没有任何改变



总结：
dispatchRequest 整体做了两件事情：转换请求数据，转换响应数据

但是中间，它调用 adapt去发送请求


因此，整体有三步：

转换请求数据 ===> 调用 xhrAdapter()发请求 ===> 请求返回后转换响应数据. 返回 promise



### xhrAdapter(config)

dispatchRequest 里面没有处理param参数， 它处理的是 请求体数据 和 响应体数据

xhr.js(adapter)里面的 buildURL 处理 params参数

而且xhr里面并没有直接调用 resolve,reject

是通过 settle 调用的

axios的取消是 cancel
但是xhr不叫取消，叫中断
onabort(后面将取消再说)



xhr里面主要就是封装 xhr，然后对一些请求步骤进行了更细致、全面的处理
不好太细将







