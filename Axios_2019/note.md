视频地址：
https://www.bilibili.com/video/BV1NJ41197u6


视频名称：
尚硅谷_axios核心技术

axios从入门到源码分析




1.  请求报文

    get请求没有请求体
    一般只有post有，而且post必须要带请求参数才有

    请求体的格式
        urlencoded格式         a=123&b=456
        json格式

    而对于不同的请求体的格式，后台需要做不同的处理方式
    那么就应该协商好格式，如何协商呢？

    通过请求头的 Content-Type 来设置 (固定的写法)
    Content-Type:   application/x-www-form-urlencoded           // urlencoded格式
    Content-Type:   application/json                            // json格式


    当然，请求头的格式不局限这种字符串的类型，当上传图片或者文件的时候，会是其它的类型(这里因为不涉及，就不细讲)



2.  响应报文


    服务器生成cookie数据，返回给浏览器使用
    

    query参数和param参数

    http:127.0.0.1:3000/posts?id=1  query参数 
    一个是过滤： 把数据中的符合条件的数据筛选出来(id = 1)
    db.json 文件中 posts本身是一个数组，筛选过后的还是数组


    http:127.0.0.1:3000/posts/1   param参数
    一个是定位到数据：posts本身是数组，但是成员是对象
    所以获取到的结果是对象格式


3. 使用 json-server 搭建 REST API

npm install -g json-server

启动服务器执行命令: json-server --watch db.json

===========

问题:   fetch是包装的 XMLHttpRequest吗?
        axios是包装的 XMLHttpRequest吗?

    浏览器有专门的 ajax引擎,来发送ajax请求


==========

open(): 初始化一个请求, 参数为: (method, url[, async])

async 这个参数是个boolean类型
true 表示异步
false 表示同步
一般不加，默认是true，也就是异步

如果加了fasle，就表示同步，影响的是send()

同步的结果就是：必须等到请求返回，才会继续执行(也就是send这里就阻塞了，返回数据才能往下执行代码)


===

abort() 中断是发出去了，但是还没返回


===

请求头的值才是关键，是我们想要传的数据
请求头的name只是个标识


===

axios(configobj) 
axios的配置对象中有一个参数  params 这个对象是用来设置get或者post的query参数，虽然名字叫params，但是却是用来设置query参数的，最后自动帮你拼在url后面

data属性里面传的才是 params参数，可以写成对象或者字符串
但是真正发请求的时候，最终传的还是字符串，如果你设置的是对象，axios会自动帮你转成json格式的字符串


201	Created	已创建。成功请求并创建了新的资源


=====

自己封装axios

1. 先封装参数,返回promise

2. 处理post请求发送的请求体参数

3. 处理get请求发送的query参数

4. 处理请求完成的promise封装


OPTION请求: 预检测 CROS 请求

一段时间没发送ajax请求后(不是每次都会发送,一般要间隔一点时间)
发送请求前,浏览器会先发一个 OPTION请求,这个请求是预检测请求
因为我们的请求是跨域请求,为防止出错,浏览器发送option请求检测后台是否允许跨域

get请求好像不发 OPTION, post,put,delete才会有,因为 get不修改数据




====

axios一个非常重要的特点: 拦截器 interceptors(目前我不是很清楚,看视频仔细学习,axios必说的一个东西)
支持 请求/响应 拦截器


请求/响应数据转换: 就是实际的请求体都是字符串格式,我们写代码的时候,一般都是用对象格式, 自动转换


批量发送多个请求: 实际上封装的是 promise.all

XSRF: 网络安全攻击相关的东西


axios.default.baseURL



函数对象: axios.put get post delete

axios的token


axios的二次封装(面试必说)

为什么要二次封装？

1. 项目中可能需要从多个后台ip，不同端口号获取数据，这个时候，配置多个axios，直接通过不同方法调用即可，而不用每次都反复配置
(看弹幕，有人说vue的动态代理，看看是什么东西)

也可以不用，但是都设计好了，用起来更舒服，为什么不用？舍近求远？


2. 写项目的时候爽啊，只需调个方法，返回的就是服务器的数据，错误处理也是集中的错误处理


====

interceptors是什么？拦截器，  是回调函数

拦截器分为 请求/响应

有分别分为： 成功/失败

请求
    成功
    失败

响应
    成功
    失败

不过失败一般很少用，有统一的错误处理
而且失败返回的是  return Promise.reject(error);
有点像错误向上传递的味道


请求拦截器 先添加，后执行
响应拦截器 先添加，先执行


另外，拦截器这边是通过promise串联任务执行的：是将任务一个接一个的串联执行的
而axios的请求的配置对象或者响应报文的response 
都是通过一层一层传递下去当作参数使用的

如果在拦截器中没有返回(默认返回undefined)，下一步的工作使用undefined就会出问题，因为经常用到 undefined.xxx



===

error信息中有stack属性


// 试着把axios封装成下面这种写法(平安的写法)

$.api.get('', {})

===









问题: 如何在html中引入 npm 安装的模块?




一些回忆的知识点可以看PPT


视频的源码解析部分还没看完

