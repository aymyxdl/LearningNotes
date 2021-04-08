function myModule () {
    // 私有数据
    var msg = 'My atguigu';

    // 操作数据的行为
    function doSomething() {
        console.log('doSomething(): ' + msg.toUpperCase());
    };
    function doOtherthing() {
        console.log('doOtherthing(): ' + msg.toLowerCase());
    };

    // 向外暴露对象（给外部使用的方法）

    // return doSomething;
    // 如果只需要暴露一个函数，直接返回就行
    // 那么如果暴露多个函数呢？
    // 用一个容器把这两个函数封装起来： 这个容器就是对象
    return {
        doSomething: doSomething,
        doOtherthing: doOtherthing
    }
}