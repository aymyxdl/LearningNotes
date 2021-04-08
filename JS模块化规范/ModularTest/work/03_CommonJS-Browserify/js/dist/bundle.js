(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./module1":2,"./module2":3,"./module3":4,"uniq":5}],2:[function(require,module,exports){
// module.exports = vaule 暴露一个对象
module.exports = {
  msg: 'mudule1',
  foo() {
    console.log('foo()', this.msg);
  }
}
},{}],3:[function(require,module,exports){
// 暴露一个函数 module.exports = function() {}
module.exports = function () {
  console.log('module2');
}

// 虽然可以写,但是上面的就没用了, 因为 {} 覆盖了 exports 这个属性
// module.exports = {}
},{}],4:[function(require,module,exports){
//  exports.xxx = value
exports.foo = function () {
  console.log('foo() module3');
};

// 使用 exports.xxx 这种方法可以无限往 exports这个对象中添加属性
exports.bar = function () {
  console.log('bar() module3');
};

exports.arr = [1, 3, 4, 3, 3, 5, 2, 11];

},{}],5:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
