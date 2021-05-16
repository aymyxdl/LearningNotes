(function(window, dataService) {
  let msg = 'alert.js'
  function showMsg() {
    console.log(msg, dataService.getName());
  }
  window.alerter= {showMsg};
})(window, dataService)