'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 默认暴露
exports.default = {
  msg: 'modules3',
  foo: function foo() {
    console.log('i am: ', this.msg);
  }
};