'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 统一暴露
function foo() {
  console.log('foo() module2');
}

function bar() {
  console.log('bar() module2');
}

exports.foo = foo;
exports.bar = bar;