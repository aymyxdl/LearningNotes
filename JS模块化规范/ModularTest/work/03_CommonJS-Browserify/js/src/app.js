// 将其它的模块汇聚到主模块
let uniq = require('uniq');

let module1 = require('./module1');
let module2 = require('./module2');
let module3 = require('./module3');

module1.foo();
module2();
module3.foo();
module3.bar();

let result = uniq(module3.arr);
console.log(result);
// uniq 的排序方式是 基于 第一位的编码进行排序

// 这里的js我们是用node 环境启动的 (也就是服务器端)