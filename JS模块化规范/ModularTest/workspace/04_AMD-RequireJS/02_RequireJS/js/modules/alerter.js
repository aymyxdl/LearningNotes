define(['dataService', 'jquery'], function(d, $) {
  let msg = 'alert.js';
  function showMsg () {
    console.log(msg, d.getName());
  }

  $('body').css('background', 'red');

  // 暴露模块
  return {showMsg};
});