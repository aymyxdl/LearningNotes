"use strict";
// 命名空间
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
// 在代码量较大的情况下，为了避免各种变量命名相冲突，可将代码放到各自的命名空间内
// 命名空间和模块的区别：
// 命名空间：内部模块，主要用于组织代码，避免命名冲突
// 模块：ts的外部模块的简称，侧重代码的复用，一个模块里可能会有多个命名空间
// 命名空间内部的变量，属性等 默认是私有的
// 外部想要访问，也需要export
// 命名空间说开了，其实就是避免同名函数起冲突
// 比如这个文件有两个人维护
// 两个人都写了一个 class Dog
var A;
(function (A) {
    // 需要导出
    var Dog = /** @class */ (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.eat = function () {
            console.log(this.name + '喜欢吃狗粮');
        };
        return Dog;
    }());
    A.Dog = Dog;
})(A || (A = {}));
exports.A = A;
var B;
(function (B) {
    var Dog = /** @class */ (function () {
        function Dog(name) {
            this.name = name;
        }
        Dog.prototype.eat = function () {
            console.log(this.name + '却喜欢吃关东煮');
        };
        return Dog;
    }());
    B.Dog = Dog;
})(B || (B = {}));
exports.B = B;
var da = new A.Dog('小花');
da.eat();
var dbb = new B.Dog('小红');
dbb.eat();
