一、Cookie

大小在4KB左右。主要用途是保存登录信息。

Cookie机制： 如果不在浏览器中设置过期时间，cookie被保存在内存中，生命周期随着关闭而结束，这种cookie简称cookie会话。
如果在浏览器中设置了cookie的过期时间，cookie被保存在硬盘中，关闭浏览器后，cookie数据依然存在，知道过期时间结束才消失。

cookie 可以在浏览器和服务器之间来回传递，用来传递消息(比如进行登录校验)，后端可以修改cookie



二、Session

存放在服务器的
服务器会把sessionId（用户信息） 存在cookie中 返回给访问的客户端



三、Web Storage(localStorage sessionStorage)

Web Storage的概念和cookie相似，区别是它是为了更大容量存储设计的，cookie的大小是受限的，
并且每次请求一个新的页面的时候cookie都会被发送过去，这样无形中浪费了带宽，另外cookie还需要指定作用域，不可跨域调用。

除此之外，web storage拥有setItem,getItem,removeItem,clear等方法，不像cookie需要前端开发者自己封装setCookie，getCookie。
但是cookie也是不可或缺的，cookie的作用是与服务器进行交互，作为http规范的一部分而存在的，而web Storage仅仅是为了在本地“存储”数据而生


sessionStorage、localStorage、cookie都是在浏览器端存储的数据，
其中sessionStorage的概念很特别，引入了一个“浏览器窗口”的概念，sessionStorage是在同源的同窗口中，始终存在的数据，
也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一个页面，数据仍然存在，
关闭窗口后，sessionStorage就会被销毁，同时“独立”打开的不同窗口，即使是同一页面，sessionStorage对象也是不同的



Web Storage带来的好处：
1、减少网络流量：一旦数据保存在本地之后，就可以避免再向服务器请求数据，因此减少不必要的数据请求，减少数据在浏览器和服务器间不必要的来回传递

2、快速显示数据：性能好，从本地读数据比通过网络从服务器上获得数据快得多，本地数据可以及时获得，再加上网页本身也可以有缓存，因此整个页面和数据都在本地的话，可以立即显示

3、临时存储：很多时候数据只需要在用户浏览一组页面期间使用，关闭窗口后数据就可以丢弃了，这种情况使用sessionStorage非常方便





四、sessionStorage、localStorage和cookie的区别
共同点：都是保存在浏览器端、且同源的
区别：
1、cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，
而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下

2、存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识。
sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大

3、数据有效期不同，
sessionStorage：仅在当前浏览器窗口关闭之前有效；
localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；
cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭

4、作用域不同，
sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；
localstorage在所有同源窗口中都是共享的；
cookie也是在所有同源窗口中都是共享的

5、web Storage支持事件通知机制，可以将数据更新的通知发送给监听者
6、web Storage的api接口使用更方便










