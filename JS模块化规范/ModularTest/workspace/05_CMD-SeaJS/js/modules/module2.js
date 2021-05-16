// 定义没有依赖的模块
define(function (require, exports, module) {
  let msg = 'module2';
  function bar() {
    console.log(msg);
  }

  // 暴露模块
  module.exports = {bar};
});