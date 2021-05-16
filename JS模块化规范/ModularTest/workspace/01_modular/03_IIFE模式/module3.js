/**
 * IIFE模式: 匿名函数自调用(闭包)
 * IIFE : immediately-invoked function expression(立即调用函数表达式)
 * 作用: 数据是私有的, 外部只能通过暴露的方法操作
 * 问题: 如果当前这个模块依赖另一个模块怎么办?
 */
//IIFE模式

const module33 = (function() {
  let msg = 'module33';
  function foo() {
    console.log('foo()', msg);
  }

  // 这里有点不同，本来我的意思是 return foo;
  // 然后IIFE 的返回值用一个参数接收
  // test3.html中引入这个js，就同样会引入这个变量
  return foo;
})();

// 然后老师的想法跟我不一样,有三处地方不一样
// 1. 不返回, 直接在 window上绑定
// 2. 绑定成对象的一个方法
// 3. 实参加上window

(function (window) {
  let msg = 'module3';
  function foo() {
    console.log('foo()', msg);
  }
  window.module3 = {foo};
})(window)



