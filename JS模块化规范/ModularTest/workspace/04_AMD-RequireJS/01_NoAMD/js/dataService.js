(function(window) {
  let msg = 'dataService.js';
  function getName() {
    return msg;
  }
  window.dataService = {getName};
})(window);