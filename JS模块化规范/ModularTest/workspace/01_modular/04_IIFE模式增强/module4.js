/**
 * IIFE模式增强 : 引入依赖
 * 这就是现代模块实现的基石
 */

 (function (window, $) {
  let msg = 'module4';
  function foo() {
    console.log('foo()', msg);
  }
  // 这个没有封装成对象
  window.module4 = foo;
  $('body').css('background', 'red');
})(window, jQuery)

// 说实话,我没看出哪里是增强模式
// 就因为是传入参数了?
