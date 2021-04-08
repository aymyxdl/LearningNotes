'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(module1, module2);
(0, _module.foo)(); // 引入其它的模块

// 语法: import xxx from '路径';

(0, _module.bar)();
(0, _module2.foo)();
(0, _module2.bar)();
console.log(_module4.default, _module4.default.msg);
_module4.default.foo();