"use strict";
// ts里的函数
// ES5的函数声明法
// 1.函数声明法
function run() {
    return 'run';
}
// 这里有点奇怪，我在2_dataType.ts中也定义了一个run方法，这两个竟然起冲突了
// 都不是同一个文件，为啥会冲突报错
// 2.匿名函数
var run2 = function () {
    return 'run2';
};
// ts中定义函数的方法
// 1.ts的声明方式
function run3() {
    return 'run3'; // 返回类型必须和声明时候设置的类型一致
}
// 匿名函数
// 1.ts的匿名函数方式
var run4 = function () {
    return 666;
};
// -----------
// ts中定义方法传参
function getInfo(name, age) {
    return name + " ---- " + age;
}
alert(getInfo('zhangsan', 20));
// 匿名方式
var getInfo2 = function (name, skill) {
    return name + " can " + skill;
};
alert(getInfo2('zhangsan', 'play games'));
// 没有返回值的方法
function getVoid() { }
// -----------
// 3.2、 方法可选参数
// es5里面 方法的实参和形参可以不一样，但是ts中必须一致，如果不一样，必须配置可选参数
// 使用 ? 来设置可选参数
function getInfo3(name, age) {
    if (age) {
        return name + " ---- " + age;
    }
    else {
        return name + " ---- \u5E74\u9F84\u4FDD\u5BC6";
    }
}
alert(getInfo3('zhangsan'));
// 注意，默认参数必须在参数列表的最后面进行配置
// -----------
// 3.3、 默认参数
// es5里面不可以设置默认参数
// es6和ts都可以配置默认参数
function getInfo4(name, age) {
    if (age === void 0) { age = 20; }
    if (age) {
        return name + " ---- " + age;
    }
    else {
        return name + " ---- \u5E74\u9F84\u4FDD\u5BC6";
    }
}
alert(getInfo4('zhangsan'));
// -----------
// 3.4、 剩余参数
function getSum(a, b, c) {
    return a + b + c;
}
alert(getSum(1, 2, 3));
// 但是问题实际情况不仅仅只是局限于3个参数
// 所以参数的数量是可变的
// 因此我们可以使用 ... 运算符来收集剩余的参数合并成一个数组
function getSum2() {
    var result = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        result[_i] = arguments[_i];
    }
    var sum = 0;
    for (var i = 0; i < result.length; i += 1) {
        sum += result[i];
    }
    return sum;
}
alert(getSum2(1, 3, 4, 5, 6));
// 当然也可以明确的指定前面几个参数，把后面的剩余参数收集起来
function getSum3(a, b) {
    var result = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        result[_i - 2] = arguments[_i];
    }
}
function getInfoTest(str) {
    if (typeof str === 'string') {
        return 'i am xxx';
    }
    else {
        return str + 10;
    }
}
function getInfoTest2(name, age) {
}
// -----------
// 3.6、 箭头函数 es6
// this指向的问题： 箭头函数里面的this指向上下文
