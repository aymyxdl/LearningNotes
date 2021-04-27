(function (window) {
    // 私有数据
    var msg = 'My atguigu';

    // 操作数据的行为
    function doSomething() {
        console.log('doSomething(): ' + msg.toUpperCase());
    };
    function doOtherthing() {
        console.log('doOtherthing(): ' + msg.toLowerCase());
    };

    window.module = {
        doSomething: doSomething,
        doOtherthing: doOtherthing
    }
})(window)
// 一般这个立即执行函数，会传入一个参数window，供内部使用
// 而不是直接在内部使用 window