视频地址：
https://www.bilibili.com/video/BV18s411E7Tj


视频名称：
尚硅谷JS模块化教程(js模块化精讲含commonjs、AMD、ES6、CMD规范)



CommonJS  在服务器端是同步的: 意思就是会造成阻塞,需要顺序等待

          暴露模块:2种写法

            module.exports = value;
            exports.xxx = value;

          暴露的本质是什么?
            本质都是 exports 的这个 对象

          引入模块:
            require('xxx');
                一般require的分为2种:
                  1. 第三方模块; xxx为模块名
                  2. 自定义的模块: xxx 为文件模块路径


// 老师说的 说明书性质, 也不知道是不是这样
package.json 中的 devDependencies 和 dependencies 只是说明书的性值,对实际情况没用任何影响(打包也没用影响吗?)
真正编译使用的是 node_modules 里面的依赖


在03_CommonJS-Browserify 中 用 require 和 module.exports 实现了导入和导出模块
在html中虽然表面上引入了app.js
    但是运行的时候会报错,是因为 js 无法识别 require命令
    因此需要把项目打包编译后才能运行
因此,需要用到刚刚安装的 browserify 进行编译处理

browserify js/src/app.js -o js/dist/bundle.js   // -o 表示 output

(总算是解决了我一个一直以来的困扰,一般的页面中如何引入模块,然后成功运行)



// =========

AMD(又叫 require.js)
  // 因为刚开始 commonjs只在服务器端用(nodejs使用),没有浏览器的使用方法
  // 于是 AMD出了浏览器使用模块的API
  // 后来commonjs才出的


    定义暴露模块
        没用参数
          define(function () {
            return 模块
          })

        有参数的时候: 显示声明依赖注入

          define(['module1', 'module2'], function(m1, m2) {
            return 模块
          })
    引入使用模块

          require(['module1', 'module2'], function(m1, m2) {
            使用 m1/m2
          })


AMD 暴露倒是好写
那么如何引入使用呢?
因为我根本不知道引入的模块名对应哪个文件

所以这里,需要进行配置
requirejs.config({
  paths: {
    app: '../app'
  }
})

另外,要通过 script 标签上的 data-main 属性来设置 入口文件
不然不用 data-mian属性,直接引入main.js 会报错
<script data-main="./js/main.js" src="./js/libs/require.js"></script>
  <!-- <script src="./js/main.js"></script> -->


额外说明: 当jQuery遇上 AMD的引入时,模块名需要改一下


// ===============


CMD(SeaJS)

暴露模块与引入模块： 

  // 定义没有依赖的模块
  define(function (require, exports, module) {
    // 暴露模块
    module.exports = xxx;
  });


  // 定义有依赖的模块

  define(function(require, exports, module) {
    // 两种引入模式

    // 同步引入
    let module2 = require('./module2');

    // 异步引入
    require.async('./module3', function(module3) {});

    // 第二种暴露方式
    exports.fun2 = xxx;
  });

// 最终使用，当然seajs文件需要引入

seajs.use('./js/modules/main.js')



// ============

ES6的模块

  导出模块: export
  引入模块: import

es6和 commonjs一样
也是需要进行编译处理,因此同样需要 browserify
(我的理解 browserify 是处理 require语句:也就是commonjs,不知道是es的模块内置有 require,还是 browserify 新增了功能也能处理 import语句)


首先需要安装工具: babel-cli, babel-preset-es2015和browserify
  npm install babel-cli browserify -g
	npm install babel-preset-es2015 --save-dev 

  
cli: command line interface 命令行接口

babel 是一个工具链/库(JavaScript 编译器) 来将es6+ 的语法转换成 es5 的语法

babel-cli (集成了babel 语法的使用命令, 也就是说,安装了这个库之后,就可以使用babel的命令了)
(
  相当于,我本来不能使用 npm 命令,装了node后,就可以使用了
  还有装了 browserify 这个库后,就可以使用 browserify 命令了
  json-server这些...
)


babel-preset-es2015 这个库将 es6的语法 转换成 es5语法 的所有插件,打包下载下来
(注意,这里是转换插件,是干活的工具)

babel 里面有很多的工具库
不只能转换 es6 -> es5
还能转换 react 的 .jsx文件转成 js文件
应该还有 vue 的 .vue文件

题外话,现在2021-3-30,包好像更新了?
叫 babel-preset-env


装完了,需要创建 .babelrc文件
因为:
babel的插件干活之前,会去读取 .babelrc这个文件

rc = run control  运行控制(表示运行时控制文件: 运行的时候需要读的文件)


编译
  使用Babel将ES6编译为ES5代码(但包含CommonJS语法) : babel js/src -d js/lib
  使用Browserify编译js : browserify js/lib/app.js -o js/lib/bundle.js

 
// 首先需要将 所有的es语法的模块文件编译 (babel 转换文件夹路径,也就是所有的文件);
// 然后转换成了common js 语法(是不是说es的底层实现,还是commonjs?)
// 再使用 browserify 编译入口文件,这里只需要转换一个入口文件就行


引入依赖和引入自定义文件一样
先安装依赖
let xxx = import('安装的依赖');


es的暴露 分为几种:
  分别暴露
  统一暴露
  默认暴露


import的方式
  1. 通用的导入方式
    import * as m1 from 'xxx.js'; // 这里把 js 整个文件整合成了 m1 对象,里面的方法属性同过 m1. 调用

  2. 解构赋值形式
    import {xx as aa, xxx} from 'xxx.js'; // xxx.js 一般是 分别暴露或者统一暴露,这样解构赋值的形式把 那些属性,方法 对号入座 拆解开来

  3. 简便形式: 只针对默认暴露
    import xx from 'xx';

    






问题: 不是说 npm 5.0以后 初始化 package.json 会自动路转换路径的大小写吗?

