// 引入其它的模块

// 语法: import xxx from '路径';

import {foo, bar} from './module1';
import {foo as foo1, bar as bar1} from './module2';
import module3 from './module3';

// console.log(module1, module2);
foo();
bar();
foo1();
bar1();
console.log(module3, module3.msg);
module3.foo();

