"use strict";
console.log('hello ts');
// 需要将 ts  =>  js
var str = '你好';
var num = '你好ts1';
// 但是每次写好代码之后，都要手动进行编译，很麻烦，所以可以进行配置，自动编译
// 配置方法：
// 1. 通过cmd命令：  tsc --init 
// 生成tsconfig.json文件，然后在里面修改输出目录
// 2. 运行vscode的 terminal => run task (选择对应需要监听的那个配置文件即可)
