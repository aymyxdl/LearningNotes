define(function() {
  let msg = 'dataService.js';

  function getName () {
    return msg;
  }

  // 暴露模块
  // 都可以
  // return getNmae;
  return {getName};
});