(function() {
  requirejs.config({
    baseUrl: 'js',  // 基本的路径,出发点在根目录下
    paths: {
      // 另外,不要加后缀 .js, requirejs 会自动拼接 .js 后缀
      dataService: './modules/dataService',
      alerter: './modules/alerter',
      jquery: './libs/jquery-1.10.1'
    }
  });
  
  requirejs(['alerter'], function (a) {
    a.showMsg();
  });
})();