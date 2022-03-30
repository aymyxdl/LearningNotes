"use strict";
// 装饰器
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 装饰器是一种特殊类型的声明,它能够被附加到类声明,方法,属性或参数上,可以修改类的行为
// 通俗的讲装饰器就是要给方法,可以注入到类,方法,属性参数上来扩展类,属性,方法,参数的功能
// (个人理解,就是不直接修改类,不改动类的代码,把扩展的代码写在方法里面,然后再把这些功能注入到类中)
// 需要的时候就注入,不需要的时候就取消,还不会改动原来的代码
// 常见的装饰器有:类装饰器、属性装饰器、,方法装饰器、参数装饰器
// 装饰器的写法:普通装饰器(无法传参)、装饰器工厂(可以传参)
// 装饰器是过去几年js最大的成就之一,已经是es7的标准之一
// 类装饰器:在类声明之前被声明(紧靠着类声明)
// 应用于类构造函数,可以用来监视,修改或替换类定义
function logClass(param) {
    console.log(param, '------');
    param.prototype.url = '动态扩展的属性';
    param.prototype.run = function () {
        console.log('我可以 run 的飞快');
    };
}
// 上面的  类 装饰器已经写好了
// 而要如何使用它,也非常简单
//  @logClass
// 这个就是无参的写法(普通装饰器),不能自己传递参数,默认就是 当前的这个类 作为参数
var HttpClientDemo = /** @class */ (function () {
    function HttpClientDemo() {
    }
    HttpClientDemo.prototype.getData = function () { };
    HttpClientDemo = __decorate([
        logClass
    ], HttpClientDemo);
    return HttpClientDemo;
}());
var hcd = new HttpClientDemo();
console.log('====', hcd.url);
hcd.run();
// 装饰器工厂
function logClass2(param) {
    return function (target) {
        console.log(target, '类本身');
        console.log(param, '装饰器参数');
        // target 就是类本身
        // param 就是装饰器传递的参数
    };
}
var HttpClientDemo2 = /** @class */ (function () {
    function HttpClientDemo2() {
    }
    HttpClientDemo2.prototype.getData = function () { };
    HttpClientDemo2 = __decorate([
        logClass2('hello')
    ], HttpClientDemo2);
    return HttpClientDemo2;
}());
var hcd2 = new HttpClientDemo();
// 装饰器不仅可以修改当前类的属性和方法
// 还能修改当前类的构造函数(重载构造函数)
// 类装饰器表达式会在运行时当作函数被调用,类的构造函数作为其唯一的参数
// 如果类装饰器返回一个值,他会使用提供的构造函数来替换类的声明
// 上面的两句说明通过例子来理解
function logClass3(param) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.apiUrl = '我是修改后的';
            return _this;
            // 我感觉这样重写构造函数才算是真正的重写,不过视频没这样写
            // constructor () {
            //   super()
            //   this.apiUrl = '装饰器构造函数二次修改'
            // }
        }
        // 说实话,这里有点不像是重写构造函数啊
        // 看着更像是 直接赋值了 apiUrl
        // 和重写getData
        class_1.prototype.getData = function () {
            console.log('666666');
        };
        return class_1;
    }(param));
}
var HttpClientDemo3 = /** @class */ (function () {
    function HttpClientDemo3() {
        this.apiUrl = '一开始的url';
    }
    HttpClientDemo3.prototype.getData = function () { };
    HttpClientDemo3 = __decorate([
        logClass3
    ], HttpClientDemo3);
    return HttpClientDemo3;
}());
var hcd3 = new HttpClientDemo3();
console.log(hcd3.apiUrl);
// 属性装饰器
// 属性装饰器表达式会在运行时当作函数被调用,传入下列2个参数
// 1、对于静态成员来说:是类的构造函数,对于实例成员:是类的原型对象
// 2、成员的名字
// 类装饰器(可以和属性一起使用)
function logClass4(param) {
}
// 属性装饰器
function logProperty(param) {
    return function (target, attr) {
        console.log('属性装饰器--target', target);
        console.log('属性装饰器--attr', attr);
        console.log('属性装饰器--param', param);
        target[attr] = param;
        // target 在这里就是实例对象: hcd4
        // attr就是装饰器修改的属性
        // param就是传入的修改的值
    };
}
var HttpClientDemo4 = /** @class */ (function () {
    function HttpClientDemo4(url) {
        this.url = url;
    }
    HttpClientDemo4.prototype.getData = function () { };
    __decorate([
        logProperty('url属性被修改了')
    ], HttpClientDemo4.prototype, "url", void 0);
    HttpClientDemo4 = __decorate([
        logClass4
    ], HttpClientDemo4);
    return HttpClientDemo4;
}());
var hcd4 = new HttpClientDemo4('url一开始的值');
// 3. 方法装饰器
// 它被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义
// 方法装饰器在运行时传入下列3个参数
// 1.对于静态成员来说是类的构造函数，对于实例来说是类的原型对象
// 2.成员的名字
// 3.成员的属性描述符
// 装饰器
function logMethod(params) {
    return function (target, methodName, desc) {
        console.log('1.对于静态成...', target);
        console.log('2.成员的名字', methodName);
        console.log('3.成员的属性描述符', desc);
        target.apiUrl = 'xxx';
        target.run = function () {
            console.log('logMethod run');
        };
        // desc.value就是 getData 原生方法
        // 修改这个就可以覆盖原来的方法
        // 1、先保存当前的方法
        var originMethod = desc.value;
        desc.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.log('覆盖了原来的方法', param);
            args = args.map(function (value) {
                return String(value);
            });
            console.log(args);
            // 到这里只是替换胃原来在方法
            // 如果只是修改在话
            originMethod.apply(this, args);
        };
    };
}
var HttpClientDemo5 = /** @class */ (function () {
    function HttpClientDemo5() {
    }
    HttpClientDemo5.prototype.getData = function () {
        console.log('类的原生方法');
    };
    __decorate([
        logMethod('HttpClientDemo5')
    ], HttpClientDemo5.prototype, "getData", null);
    return HttpClientDemo5;
}());
var hcd5 = new HttpClientDemo5();
console.log(hcd5.apiUrl);
hcd5.run();
hcd5.getData('123', 456, 88);
// 4. 方法类型装饰器（用的不多，有点头昏眼花了，不记录这个了）
// 快速回顾：装饰器
// 用在类上面的
// 1.类装饰器
// 2.属性装饰器（类里面的属性）
// 3.方法装饰器（类里面的方法）
// 4.方法参数装饰器（用的不多）
// 4种装饰器的执行顺序
// 属性装饰器
// 方法装饰器
// 方法参数装饰器2
// 方法参数装饰器1
// 类装饰器2
// 类装饰器1
// 属性 => 方法 =>  类
// 如果有多个同样的装饰器，先执行后面的
