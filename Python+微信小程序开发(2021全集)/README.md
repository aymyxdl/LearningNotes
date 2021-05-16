## 文件配置


### app.json

app.json文件中，是用来进行全局配置的
比如：

windows:  顶部导航栏的配置(全局)
pages:  小程序中所有的页面
tabBar: 底部导航栏        // tabBar 也可以自定义组件替换掉原生的

另外还有分包信息也是在这里配置的



### sitemap.json

sitemap.json
用来进行爬虫的设置
微信里面也有爬虫，设置哪些文件可以被爬虫


### px 和 rpx

在小程序中最好不要使用px
虽然px能用，但是不会自动适配
你在这个设备用px可能刚刚好
但是换到其它的设备，就会出现不适配的问题

而使用小程序的rpx，在不同的机型上，小程序会自动适配，进行拉伸



### 页面跳转

页面跳转的方式有很多种：

#### wx.navigateTo

wx.navigateTo({
  url: '/pages/home/home?a=1&b=2'
})

---

注意这个url的地址最前面加了 /
这表示路径是从根目录开始找的

如果没有加 / ：表示从当前路径下开始找

---

url路径的后面还可以携带参数，使用URLEncoded的格式
在目标页面的onLoad(options) 中获取参数

注意：navigateTo 只能跳转到 非tabBar 的页面
如果要跳转到tabBar页面，需要使用 wx.switchTab


#### <navigato>

<navigator url=""></navigator>

wx.navigateTo 是调用js方法，进行跳转
另外还可以方便的使用标签跳转(相当于a标签)

因为有的时候，不需要携带参数或者其它操作，单纯的知识跳转就行
这个时候反而没必要写js，多耗费几行代码，直接使用标签进行跳转
同样的也可以携带参数

<navigator url="/pages/home/home?a=1&b=2"></navigator>


#### wx.navigateBack

wx.navigateBack({
  delta: 1,
})

// delta 默认是1，所以如果只返回上一页，可以直接传空对象
// wx.navigateBack({})



### 数据绑定


小程序是侵入式的：也就是说强行要求你写新的语法

比如给数据赋值，必须使用 this.setData() 来修改属性

this.data.msg = '修改了';
这样也确实可以修改成功， 其它地方用到的数据也是修改后的数据
但是这样只能改后端(js层)


如果前台需要进行响应改变(wxml也实时变化，视图层) 
那么就必须使用
this.setData({
  msg: '修改了'
})



### 箭头函数

在小程序中，在使用回调的时候，最好使用回调函数，比如

wx.request({
  success: function() {
    this.xxx;   // 这里的this 执行会出问题
  }
})


而使用箭头函数则不会出现问题

wx.request({
  success: () => {
    this.data;   // 这里的this 能够正确访问
  }
})


### globalData(全局变量)

globalData 是放在 app.js 中的，作为全局变量使用
所有的页面都可以访问这个变量，因此，可以用来存放数据
方便页面之间的数据传递，访问

var app = get App()
console.log(app.globalData)


### localStorage

使用global有个问题
重启小程序后，这些信息就没有了
按理来说，关闭小程序，重新进入后，还是能拿到之前的登录信息的

解决：使用 localStorage
wx.setStorageSync('phone', phone);
let phone = wx.getStorageSync('phone');

这里 sync 表示是同步操作



一般来说，小程序是有很多页面
而且这些页面基本上都需要用到登录信息
所以，可以在每个页面的onshow方法中去获取这个登录信息

但是相对来说，读取 本地数据，和读取内存数据，肯定是读取内存的速度要更快
所以：可以在app.js中读取 storage，然后把值赋值给 globalData 中
(也就是在程序刚启动时，读取到内存中)

在app.js 的 onLaunch 方法中进行操作

记住：app.js 中是没有 this.setData 的
所以要直接赋值

this.globalData.xxx = wx.getStorageSync('xxx');


### removeStorageSync

使用 wx.removeStorageSync('xxx')
来情况某个缓存属性


## API

### 

### wx.chooseLocation

获取定位

wx.chooseLocation({
  success: (res) => {
    console.log('success', res);
  },
  fail: (res) => {
    console.log('fail', res);
  }
})

chooseLocation 是打开地图，让你选择地图上的地点
返回你选择的坐标点
你选择了列表中的地点，才会有正确的省市和具体路名


这里也有个问题，第一次是弹窗请求授权的
如果拒绝了，后续的点击就会无效
因为一直拒绝，但是这样显然不行



按理来说，应该在每次点击的时候先 getSetting
看看是否授权了
如果确定，则继续
如果没有授权，则 openSetting 打开授权页面




### wx.openSetting

打开权限管理系统，用户手动进行授权

微信的很多API说起来，感觉使用的很没有道理
逻辑很绕，非常的麻烦，一点都不友好

口口声声说是为了阻止恶意操作
其实就是微信官方开发人员懒
不愿意从逻辑，合理性方面上设计好这些API功能，从而一刀一下
让开发人员只能这么按照它们的意愿来使用

就比如 wx.openSetting
用起来就很麻烦

而且还经过一次改版，用户只能通过button的点击唤醒
直接调用 wx.openSetting() 则无效，无法唤醒


而且这个前提判断逻辑，后续处理逻辑，让人束手束脚，太难受了



方法1：使用 button 组件来使用此功能，示例代码如下：
<button open-type="openSetting" bindopensetting="callback">打开设置页</button>


方法2:由点击行为触发wx.openSetting接口的调用，示例代码如下：
<button bindtap="openSetting">打开设置页</button>
openSetting() {  wx.openSetting()}



### wx.getUserInfo


wx.getUserInfo({
  success: function(res) {
  }
})


这个方法也弃用了，后面都用
wx.getUserProfile 来获取用户信息



### wx.getUserProfile

wx.getUserProfile({
  desc: ''  // 这个字段是必须的参数，不然无法调用，还没有提示
})

### wx.chooseImage

选择图片


// 参数有 选择的数量(最大是9张), 原图/压缩， 相册/拍照

uploadImg() {
  console.log('uploadImg');
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log('success', res);
      this.setData({
        imgList: res.tempFilePaths
      })
    },
    fail: (res) => {
      console.log('fail', res);
    }
  })
},



注意事项：

这里图片的地址
http://tmp/ipPBJ0ILmNPEcd7973301edde397ac78301eb8335d9c.jpg
并不是网络地址，而是内存地址

所以真实项目中，还需要把图片传到服务器

问题：这里的返回值只有内存地址
而没有真实的图片信息(base64码)
如何获取base64上传到服务器？
应该是隐藏自动完成的



## 组件

### button

### input

双向绑定：
双向绑定和响应式不一样

默认情况下，只能做到
js => 页面的绑定 (响应式)

<text>您输入了{{message}}</text>
<view>
  <input value="{{message}}" />
</view>

也就是修改input框内的值，上面的数据不会改变

所以需要做到双向绑定，需要在input添加方法

<input value="{{message}}" bindinput="bindTxt" />

bindTxt(e) {
  this.setData({
    message: e.detail.value
  })
},

注意这里是 bindinput 



### <process>

进度条组件出现的情景是：异步情况导致的bug

在上传图片发送的时候，
如果所有的事情都放到最后，点击发布的那一刻来说，很有可能会出现问题：
因为请求是异步的，而上传的图片如果太多，并且网络不好的情况下
你可能要等待很久，又或者你不等全部上传成功，代码就继续执行，你根本不知道是否上传成功


所以，这种情况下，一般都是在选择图片的时候，就进行文件的上传，然后在这期间，你可以做文字的输入
或者相对于的处理，来进行并行操作，最后在你点击发布的时候，就能根据文件的上传情况做出相对于的操作

此时，也就需要一个进度条来展示当前情况


小程序有自带的进度条组件
<process>

其实也可以自定义，挺简单的
就是两个div，外层的div背景设置为白色
内层div的宽度是 百分比， 颜色设置为相对于醒目的
具体的百分比进度为你当前操作占全部的百分比
这样随着数据的变化，就能呈现出动态的进度效果

同时也可以用红色表示出错，绿色表示成功
可以进行各种拓展




## 逻辑操作

### 用户登录(手机注册)

一般的登录界面都是有 账号 和 密码框
不过小程序一般都是 手机号 和 验证码


onClickLogin() {
  // 登录
  console.log(this.data.phone, this.data.code);

  let phone = this.data.phone;
  let code = this.data.code;

  wx.request({
    url: 'http://122.51.199.176:9999/v1/api/login/phone',
    data: {
      phone, code
    },
    method: 'POST',
    success: (result) => {
      if (result.data.return_code === 'SUCCESS') {
        wx.showToast({ title: '登录成功', icon: 'none' })
        // 跳转
        // 成功登录后的后续跳转等操作
      } else {
        wx.showToast({ title: '登录失败', icon: 'none' })
      }
    }
  })
}


// 登录成功后，页面应该跳转回到上一页
小程序页面的跳转就是一个 栈
每次跳转都给 栈 推入一个新的页面(跳转页面)

所以可以这样使用
// 获取当前的页面栈
var pages = getCurrentPages();
console.log(pages);
wx.navigateTo({
  url: '/' + pages[pages.length - 2].route,
})

// 或者使用 wx.navigateBack
// delta 默认是1，所以如果只返回上一页，可以直接传空对象
// wx.navigateBack({})

wx.navigateBack({
  delta: 1,
})


从登录页面成功登录返回后
其它页面的状态(数据显示)应该要发生改变
而登录的信息可以放在 globalData 中存放
回到页面的时候，判断一下是否登录了

这种情况最好放在 onShow 生命钩子中
因为我们用的是 back 方法，所以不会再执行onload

问题：但是我想知道登录成功返回的token有什么用，具体该如何使用

小程序说实话，用不用token无所谓，需要就用，不需要就不用




### https (网络请求)


微信小程序里面的 网络请求api时，必须是 https 协议

正式上线时，还需要在小程序后台管理界面
添加域名地址，这样才能成功访问,不然不让用

不过在本地开发中,可以通过设置: 不校验合法域名 



### 发送手机验证码

// 这里 进行发送验证码请求
onClickCheckCode() {
  // 进行输入判断，因为不合法，没必要发送信息
  let phone = this.data.phone;
  if(phone.length !== 11) {
    wx.showToast({ title: '请正确填写手机号码', icon: 'none' });
    return;
  }
  
  var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  if (!reg.test(phone)) {
    wx.showToast({ title: '手机格式错误', icon: 'none' });
    return;
  }

  // 接口可以用，但是因为用的别人公司的接口，不好总发短信
  // wx.request({
  //   url: 'http://122.51.199.176:9999/v1/api/code/phone',
  //   data: {
  //     phone
  //   },
  //   method: 'POST',
  //   success: (result) => {
  //     // 这里还需要判断一下，因为可能是发送短信失败，但是接口访问成功
  //     // 根据返回结果判断一下是成功发送，还是发送失败
  //     // 成功的话，显示60s倒计时
  //     this.setData({
  //       countdown: true
  //     })
  //     this.countdownFunc(60);
  //   },
  // })
  this.setData({
    countdown: true
  })
  this.countdownFunc(60);
},



countdownFunc(num) {
  // 两种方式倒计时，一种 setTimeout
  // console.log(num, this.timer);
  // if (num) {
  //   this.setData({
  //     countdownNum: num
  //   });
  //   this.timer = setTimeout(() => {
  //     this.countdownFunc(--num)
  //   }, 1000)
  // } else {
  //   this.setData({
  //     countdown: false
  //   })
  // }

  // 一种 setInterval
  let countdownNum = num;
  this.setData({ countdownNum })

  this.timer = setInterval(() => {
    countdownNum = --this.data.countdownNum;
    if (countdownNum) {
      this.setData({
        countdownNum
      })
    } else {
      clearInterval(this.timer);
      this.setData({ countdown: false })
    }
    // console.log(this.data.countdownNum);
  }, 1000)
},


注意：小程序跳转页面，但是不会清除定时器
所以，一定要在页面销毁时 清除定时器(或者页面挂起时)

onUnload: function () {
  // 销毁定时器
  clearTimeout(this.timer);
  clearInterval(this.timer);
},


小技巧：如果嫌 每次保存代码就自动编译 麻烦的话
可以设置成保存不编译，自己手动编译



### 注销登录


logout() {
  // 下面这两行其实也可以抽取放到 app 中
  app.globalData.loginInfo = null;
  wx.removeStorageSync('loginInfo');
  // 这个 setData 是为了刷新页面图片，变成注销状态的默认格式
  this.setData({
    loginInfo: null
  })
}

可以使用 wx.removeStorageSync 快速清空某个缓存,而不必传对象格式



### 生命周期


小程序页面的生命周期

onLoad()    一次
onShow()    每次展示这个页面，就会自动调用
onReady()   一次

onHide()    每次页面因此，就会自动调用
onUnLoad()  一次(注销组件)    wx.redirectTo


下面的是手动触发
onPullDownRefresh()   监听用户下拉动作
onReachBottom()       上拉触底事件的处理函数
onShareAppMessage()   点击右上角分享


app.js
onLaunch()    全局只触发一次，小程序初始化


### 父子页面传值


微信中的  发布你的状态/提醒谁看

这种场景都是点击后，跳到一个子页面，选择了数据后，又会返回父页面
而子页面的选择状态，会在父页面中展示出来

这种业务，反而不太好使用页面跳转进行传值
用globalData 也没有必要

这里推荐使用 getCurrentPages() 来完成
因为 getCurrentPages() 获取的是 页面对象 的数组
这个页面对象(基本上就可以看作是对应的页面的Page 对象)
因此可以给他设置属性

const pageArr = getCurrentPages();
const prePage = pageArr[pageArr.length - 2];

// 这个prePage对象 就是那个页面实例
prePage.setData({
  topic: 'xxxx'
})

赋值完成后，在调回去
wx.navigateBack({})

小程序可以这样 在 子页面中对父页面的数据进行修改

或者在父页面中设置 进行赋值的方法
然后在子页面中调用父页面的方法进行赋值


这里不仅仅可以修改其它页面的数据
还可以调用其它页面的方法
prePage.xxx();



### 修改数据的局部属性


小程序中，是无法使用setData修改 数据的局部变量的
会编译报错

upList: [
  {id: 1, title: '图片1', percent: 20},
  {id: 2, title: '图片2', percent: 50},
  {id: 3, title: '图片3', percent: 70}
]

// 报错
this.setData({
  upList[0].percent: 77
})

// 所以可以使用统一修改
// 但是因为全部都要修改，因此性能很差
let upList = this.data.upList;
upList[0].percent = 77;
this.setData({
  upList
})

// 推荐
// 字符串的形式
let num1 = 1;
let num2 = 2;
this.setData({
  ['upList[0].percent']: 35,
  ['upList[' + num1 + '].percent']: 45,       //  直接拼接
  [`upList[${num2}].title`]: '????'           //  字符串模板
})

找嵌套的索引的时候，必须是个字符串



### let 解决闭包问题


以前都是用button按键来讲解闭包
这个老师用异步请求来解释闭包，感觉这样效果更好，因为实际开发中更多的是异步请求


for (var i in ['a', 'b', 'c']) {
  wx.request({
    url,
    success: function () {
      console.log(i)  // 每次都是 2
    }
  })
}


因为这里会用到闭包(当然用 let 也可以)

批量选择图片上传的时候，成功的回调函数，需要找到对应的索引来改变状态



### 下拉刷新


刚进入首页， 取前十条，每次下拉刷新，都会更新最新的十条
然后触底之后，会获取比当前列表中最小的ID还要小的十条(一般用id来进行标值)
(参考微信朋友圈的效果)(这种上拉下拉的操作 在这种情况下比分页效果好很多)


小程序的下拉刷新的配置：全局和局部

全局：app.json 的window中配置
window: {
  "enablePullDownRefresh": true
}

局部：全局设为false, 对应页面的 属性设置为true
{
  "enablePullDownRefresh": true
}


另外在js中可以进行回调

/**
  * 页面相关事件处理函数--监听用户下拉动作
  */
onPullDownRefresh: function () {
  console.log('监听用户下拉动作');
},


还有，下拉刷新的加载 动作的事件默认是固定的
但是这样不合理，因为一般都是请求数据成功后在停止刷新动作


### 整合API

将 URL 的路径 整合为 模块API

这里只是单单的整合了 URL，还可以拓展为方法，接口

/config/http.js
/config/api.js
/pages/publish/publish.js

里面的onLoad

------------

/config/http.js

const baseUrl = 'http://122.51.199.176:9999/';

// 封装Promise
export default function wxRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}${url}`,
      method,
      data,
      success: res => resolve(res),
      file: res => reject(res)
    })
  })
}

------------

/config/api.js

import wxRequest from './http';

export default {
  getNews(param) {
    return wxRequest('POST', 'v1/api/login/phone', param)
  }
}

-----------

/pages/publish/publish.js

import api from '../../config/api';   // 这里竟然不能直接解构成 getNews，可能我封装的方式有点不太对

async onLoad(options) {
  wx.hideShareMenu();
  const { getNews } = api;
  const res = await getNews({
    phone: '15000890154',
    code: '123456'
  })
  console.log(res, 'resssss');
},

注意：要开启小程序的增强编译模式，不然会报错



### 瀑布流



瀑布流一般有两种解决方案：

方式一：做两个div,各自宽度百分之五十，数据一边一个

<view style="width: 50%">
  1   3   5
</view>
<view style="width: 50%">
  2   4   6
</view>

-----


<view class="container">
  <view class="item">
    <image src=""></image>
    <image src=""></image>
  </view>
  <view class="item">
    <image src=""></image>
    <image src=""></image>
  </view>
</view>


.container {
  display: flex;
  flex-flow: row;
}

.container .item {
  flex: 1;
  width: 50%;
}

.container .item image{
  width: 100%;
}


但是这里需要注意一下宽高等比缩放的问题
因为 image 可以设置相应的属性，所以不需要通过css 设置
(这里贼坑，在平常js开发中，默认不设置高度就会自适应高度
但是小程序不行，需要设置 mode属性才行，浪费大量时间写样式代码，还不生效)
<image src="" mode="widthFix"></image>


放数据的时候，就要注意了，一边一半，可以通过左边前五个，右边后五个
或者左边放奇数，右边放偶数
(我觉得这样的话，如果左边恰好都是非常非常高的图片，怎么办？)



方式二：  column-count


.container {
  width: 300rpx;

  -moz-column-count: 2;
  -webkit-column-count: 2;
  column-count: 2;

  -moz-column-gap: 10rpx;
  -webkit-column-gap: 10rpx;
  column-gap: 10rpx;
}

.container image {
  width: 100%;  // 这里要设置不然不会自适应
}


这种同样需要设置 image 的 mode="widthFix"


### 用户认证


用户的token 可以放到请求体(post)，可以放到query参数(get)
也可以放到请求头中(header)

这里使用 header 来存放请求头

一般都叫 Authorization
wx.request({
  header: {
    authorization: app.globalData.loginInfo.token
  }
})

注意：这里的token信息可有可无，因为如果没登陆的话，就不需要token
而且loginInfo这是属性就没有， 用 .token 会报错，所以需要判断一下

// authorization: app.globalData.loginInfo ? app.globalData.loginInfo.token : ''
authorization: app.globalData.loginInfo?.token
推荐 es10 的写法



### 页面判断登录

小程序的页面是如何处理判断登录逻辑的？

就是在每个需要登录后才能操作的行为前面
进行 if(token) 的判断，如果没登陆，则 wx.navigateTo()

感觉有点不是很智能，因为如果这种行为很多的话，那么都要加上
(感觉有点冗余，或者封装一下？)



### 自定义tabBar


需要注意：
一般情况下，在tabBar上点击某个标签跳转页面
而如果你要点击跳转的页面需要登录后才能访问的话
判断登录，不能放在那个页面判断
因为如果放在 那个页面的onload里面判断的话
首先会加载那个页面，一瞬间你可以看到页面的内容
然后再跳转到登录界面

这时还有个超级严重的问题：如果你不想登录了，
直接返回，就会跳到了那个页面，还没有登录

也千万不能在onShow 里面判断，不然会死循环
所以，这个时候需要自定义 tabBar

而自定义 tabBar 属于组件，所以需要创建 component
这个时候，就不能使用 创建Page了，要使用 创建component
和传统的page 页面有些不同：

1.在 组件的 json文件中
"component": true,    // 有这个属性

2.在 js 文件中，也不是 page({})
而是  Component({})

3.并且里面还有 properties 属性
这些属性 就是 标签上面的属性:
<tb class='c1' />

4.方法必须写在 methods 中


tabBar的定位是使用 fixed，固定在最底部

------


如何使用自定义的tabbar 

首先在component 文件夹下面写好自定义的组件(可以使用官方的自定义tabbar模板)

然后在 app.json 中的tabbar对象加一个属性
custom: true

这样，就不会用官方的tabbar了
但是这个时候，页面tabbar反而没了
是因为你没有在对应的页面引入tabbar组件

需要在对应的页面的 json文件中引入组件

"usingComponents": {
  "tab": "/component/tabbar/tabbar"
}

然后在wxml文件中使用
<tab />

-------

这时候可以正常引入并显示tabbar了

然后这里点击绑定的是 switchTab
这个时候，你就可以在跳转前去做判断了
判读用户是否登录了，如果没有登录，直接跳转到登录页面


switchTab(e) {
  const hasToken = app.globalData.loginInfo ? app.globalData.loginInfo.token : null;
  const url = e.currentTarget.dataset.path;
  if (url === '/pages/publish/publish' && !hasToken) {
    console.log('我想跳转到发布页面，但是我没有登录，所以我要自动跳转到登录页面');
    wx.navigateTo({
      url: '/pages/auth/auth',
    });
    return;
  }
  wx.switchTab({
    url
  })
}

// 我这里做了最简单的判断，如果没有token那么直接跳转到登录页

这里有个小问题，我跳转到其它tabbar界面，但是图标的颜色没有变

这时有因为 tabbar组件的选中高亮效果是
data: {
  selected: 0
}

这里是写死的，我们需要讲它挪到prop中去

properties: {
  selected: {
    type: Number,
    value: 0
  }
},

这样，在不用页面的标签上，对上对应的index，当作参数传进来
<tab selected="1" />


-----


然后tabbar上面有选中和没选中的图片
但是我有一个选项不想要图片，如果不加图片属性，则会显示一个加载失败的图标
这样明显不符合要求
那么可以在tabbar.wxml中看到

有 <cover-image /> 和 <cover-view /> 两个标签

image这个是显示图片的，view这个是显示文本的
我们可以把它用block包裹起来，做一下判断
如果不是特定的页面，就显示两个
符合要求的话，则显示你想要的效果

<block wx:if="{{item.text !== '发布'}}">
  <cover-image src="{{selected === index ? item.selectedIconPath : item.iconPath}}"></cover-image>
  <cover-view style="color: {{selected === index ? selectedColor : color}}">{{item.text}}</cover-view>
</block>
<block wx:else>
  <cover-view style="color: {{selected === index ? selectedColor : color}}">{{item.text}}</cover-view>
</block>



至于这里的 cover 这种标签是什么意思？
这个是用来把这个标签的内容放到其它节点的上面

就比如你通过设置节点的 z-index 来达到放到最上层的效果
但是这个 z-index 对于地图这样的页面是无效的
所以可以使用cover标签来达到效果

将这个界面放到其它标签的最上面，谁也不能覆盖它


-----

另外，我这里还碰到个问题，点击跳到了其它页面
再次点击跳转回来的时候，报错：
VM153 WAService.js:2 Unhandled promise rejection {errMsg: "switchTab:fail can not switch to no-tabBar page"}


这个原因竟然是因为 app.json 中的list选项没有加入 (没有跳转的页面)？
不是在tabbar.js 里面定义的吗？


---

这里有种情况，你需要登录的页面，如果分享给了别人，别人进来就是这个发布页面

但是他并没有登录，按理来说是不应该在未登录的情况下进入到发布页面的
两种方式：

1.在这个页面的onload或者onshow进行登录跳转
但是不太推荐

2.推荐此用法
需要登录的页面禁止转发

两种禁止转发的方式：
一、把js中的  onShareAppMessage 函数删掉(也就是不写)
就不能进行转发，哪怕写了，里面是空函数，也能转发

二、在onload函数中调用 wx.hideShareMenu();
两种方式效果都是一样的



补充：这里工作后，项目中也有这种情况，额外补充第三种情况

3.分享地址为 跳转到一个统一的界面
在这个页面进行各种逻辑判断处理，
如果符合条件，则再进行一次页面的跳转，并把参数带过去

这种方式更好用


## 总结


小程序总结

1.申请账号和APPID(创建项目，调试，项目上线审核)

2.搭建开发者工具

3.目录结构

  config      (可以整合配置文件，接口请求之类的)

  components  (组件)

  pages       (一般放小程序页面，如果页面较多，可以拆分几个文件夹放，没有说一定要放在pages里面)
    index     (页面)
      index.js  
      index.json
      index.jwxml
      index.wxss



  utils       (放一些工具类，通过方法)

  static      (静态资源：图片之类的)

  app.js      (onLaunch:启动， globalData:全局变量)
  app.json    (公共配置，比如title，tabbar，)
  app.wxss    (公共样式)



1.4组件

  view  / text  / image
  textarea  / navigator / input / button
  block / cover-view  / cover-image / swiper


1.5微信API

  request
  navigateTo
  navigateBack
  switchTab
  chooseImage
  chooseLocation

  getUserInfo + button + opensetting

  showToast
  showLoading
  hideLoading

  setStorageSync
  getStorageSync

  getApp
  getCurrentPages


1.6事件

  自定义事件
    bindinput
    bindtap + data-
    catchtap

  onLoad
  onShow
  onReady
  onUnload
  onHide
  onPullDownRefresh
  onReachButtom
  onShareAppMessage

  onLaunch


1.7双向绑定 MVVM

  setData 全部
  setData 局部
    字符串形式
    setData({
      ['a.b.c.x']: 123
    })


1.8指令

  for
  if


1.9自定义tabBar


另外，要注意 this 和 箭头函数



## 微信支付


小程序支付
不是所有的小程序都能开通支付功能
(个人无法开通，必须要有企业账号才能申请)


1.沙箱环境
  一个用于开发测试的环境(小程序没有沙箱环境)

2.微信小程序支付
  2.1 微信小程序平台
    个人
    企业(微信支付)  
        企业微信上传公司资料，法人信息，支付押金之后，并不意味着就能开通支付了
        还需要申请商户平台账号
        然后两者关联起来

  2.2 商户平台账号(企业)
    开通商户平台
    小程序 和 商户平台账号关联

  2.3 账号
    AppId
    商户号
    商户key(关键)

3.微信支付的步骤
  登录：目的是获取用户openId
  挑选商品去支付
    生成订单(待支付)
    用户扫码支付为微信
    微信通知商户系统，系统更改订单状态



获取用户的 openId 必须要登录
wx.login({
  success: (res) => {
    // 登录成功获取 临时凭证: res.code
    // 临时凭证只能用一次，且有效时间只有五分钟
    // 然后用这个code 去获取openId

    // 但是这个openId不是由前台小程序来获取
    // 而是小程序里面调用我们自己公司的后台，传过去
    // 由我们公司的后台，转发，去向微信的服务器获取openId，然后再返回给前台
  }
})

然后前台小程序支付
需要调用支付api

wx.requestPayment({...})  // 这里面的参数就是后台给的

这里的支付方式，是前台弹出一个二维码，然后用户扫码支付？
这个是测试环境才是这样奇葩方式？
用户用手机上小程序买东西，还需要再拿一个手机，进行扫码付款？
这很不合理吧？

根本不是我想象中的那种直接弹出支付框，进行支付



