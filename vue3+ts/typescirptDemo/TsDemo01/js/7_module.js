"use strict";
// 1.模块
//  内部模块    现在乘称作 命名空间
//  外部模块    则简称为 模块
Object.defineProperty(exports, "__esModule", { value: true });
// 模块在其自身的作用域里执行，而不是在全局作用域里
// 这意味着定义在一个模块里的变量，函数，类等到在模块外面是不可见的
// 除非你明确地使用 export 形式将它们导出
// 相反，想使用其他模块导出的变量等。。需要导入它们 比如 import
// 模块的概念
// 我们可以把一些公共的功能单独抽离成一个文件作为一个模块
// 模块里的变量 函数 类等默认是私有的，需要在外部使用，就要先export导出
// 然后在需要用到的地方import导入
var db_1 = require("./modules/db");
db_1.getData();
// index 无法直接使用 import 命令
// 所以需要node 或者 webpack之类解析转义
// 这里我们直接用node命令执行 js
// node js/7_module.js
// ===================
// export 可以使用多次
// export aaa
// export bbb
// export ccc
//  或者嫌麻烦，统一 export
// export { aaa, bbb, ccc }
// 导入都是一样的
// import {aaa, bbb, ccc as c} from 'xxxx'
// ===================
// export default 只能使用一次，而且只是导出一个
// export aaa
// imort aaa from 'xxx'
// import 不需要花括号
// 其实模块化这东西很简单的
// 就是平常写代码里面的 import export
// 高级点的也就是把一个高度集中完成某种功能的代码写在一个 ts文件里面
// 然后把实例或者类暴露出去，让他们直接进行方法的调用来完成功能就行
// 而不用关心这个功能是如何实现的
