"use strict";
// 接口 
// 接口的作用：在面向对象的变成中，接口是一种规范的定义，它定义了行为和动作的规范，
// 在程序设计里面，接口起到一种限制和规范的作用。
// 接口定义了某一批类所需要遵守的规范
// 接口不关心这些类的内部状态数据，也不关系这些类里面方法的实现细节
// 它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要
// typescript中的接口类似于java，同时还增加了更灵活的接口类型
// 包括属性、函数、可索引和类等
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
// 接口就是定义标准
// 和抽象类差不多，不过抽象类只针对于类
// 而接口，则范围和功能更加强大
// 1、属性接口     ：对json的约束
/*
  ts中定义方法


function printLabel():void {
  console.log('printLabel');
}

printLabel()

*/
/*
  ts中定义方法 => 并传入参数

  
function printLabel(label: string):void {
  console.log('printLabel');
}

printLabel('hhh')
  

*/
/*

  ts中定义方法 => 并传入参数 => 对json对象进行约束

  
function printLabel(labelInfo: { label:string }):void {
  console.log('printLabel');
}

printLabel('hhh')  // 错误的写法
printLabel({name: 'zhangsan'})  // 错误的写法
printLabel({label: '666'})    // 正确的写法

 */
function printLabel(labelInfo) {
    console.log('printLabel');
}
printLabel({ label: '666' }); // 正确的写法
// 这个就是传入对象的约束（属性接口）
function printName(name) {
    console.log(name.firstName, name.secondName);
    // 达到了要求，这个方法实现了接口
}
// 要注意
// 这种方法调用时直接写的情况下，不能有多的属性，不然会报错（刚好吻合）
// printName({
//   firstName: 'first',
//   secondName: 'second',
//   name: 'name'
// })      // 会报错
// 这种在外部封装对象属性的情况
// 只要求有对应的属性就可以（可以有多余的属性）
var obj = {
    firstName: 'first',
    secondName: 'second',
    name: 'name'
};
printName(obj);
var md5 = function (key, value) {
    return key + value;
};
// var md5:encrypt
// 这种接口的实现只能通过 变量赋值的时候进行接口限制吗？
// 如果通过函数声明方式来实现接口
// implements 是 class 来实现接口的
// 我不知道这种方式该在哪里加接口的实现
function sha1(key, value) {
    return key + value;
}
var arr = ['hello', 'world'];
var objTest = {
    name: 'zhang',
    sex: 'male',
    age: '20'
};
// 类类型接口，就相当于把之前的属性接口和方法接口整合了一下
// 就变成了类 类型接口
var Dogg = /** @class */ (function () {
    function Dogg(name) {
        this.name = name;
    }
    Dogg.prototype.eat = function (food) {
        console.log('dog eat food');
    };
    return Dogg;
}());
var Programmer = /** @class */ (function () {
    function Programmer(name) {
        this.name = name;
    }
    Programmer.prototype.coding = function () { };
    return Programmer;
}());
// 这里
var WebT = /** @class */ (function (_super) {
    __extends(WebT, _super);
    function WebT(name) {
        return _super.call(this, name) || this;
    }
    WebT.prototype.eat = function () {
        console.log('动物吃东西');
    };
    WebT.prototype.run = function () {
        console.log('人会跑');
    };
    WebT.prototype.coding = function () { };
    ;
    return WebT;
}(Programmer));
var wt = new WebT('张三');
wt.eat();
wt.coding();
