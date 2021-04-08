(function () {
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
})()