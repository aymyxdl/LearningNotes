"use strict";
// 泛型: 要求组件不仅能够支持当前的数据类型
// 同时也能支持未来的数据类型
// 通俗理解:泛型就是解决 类 接口 方法的复用性
// 以及对不特定的 数据类型的支持
// eg:
// 只能返回string类型的数据
function getData(value) {
    return value;
}
// 要求可以同时返回string和number类型的数据
// 1.也许可以写一个 getData1 来处理number类型
// 2.使用 any类型 
// function getData (value: any): any {
//   return value
// }
// 但是 1 使得代码太冗余了
// 2的any类型虽然可以解决这个问题,但是同时也放弃了类型检查
// 而很多时候,需求都要求传入什么类型,就必须返回什么类型
// 而any这样使得传入的参数类型,和返回的参数类型,可以变得不一致 
// 要解决这个问题,就可以使用泛型
// 泛型:可以支持不特定的数据类型, 从而让传入和返回的数据都是同一种类型
// ------泛型函数
//  T 表示泛型,具体是什么类型,是由调用这个方法的时候决定的
// 当然可以用任何字母代表T,但是一般默认使用T
function getData2(value) {
    return value;
}
// 然后调用的方式是,在调用方法的时候,方法名和()之间加上 <数据类型>
getData2(123);
getData2('123');
// ------泛型类
// 需求:比如有个最小堆算法,需要同时支持返回数字和字符串两种类型,通过类的泛型来实现
var MinClass = /** @class */ (function () {
    function MinClass() {
        this.arr = [];
    }
    MinClass.prototype.add = function (value) {
        this.arr.push(value);
    };
    MinClass.prototype.min = function () {
        var min = this.arr[0];
        for (var i = 0; i < this.arr.length; i += 1) {
            if (this.arr[i] < min)
                min = this.arr[i];
        }
        return min;
    };
    return MinClass;
}());
// var m = new MinClass()
// m.add(3)
// m.add(12)
// m.add(13)
// m.add(6)
// alert(m.min())
// 但是上面这个情况,只能传入数字,不能传入 a - z 比较大小,
// 因此使用泛型进行修改 
var MinClass2 = /** @class */ (function () {
    function MinClass2() {
        this.arr = []; // 修改 number => T
    }
    MinClass2.prototype.add = function (value) {
        this.arr.push(value);
    };
    MinClass2.prototype.min = function () {
        var min = this.arr[0];
        for (var i = 0; i < this.arr.length; i += 1) {
            if (this.arr[i] < min)
                min = this.arr[i];
        }
        return min;
    };
    return MinClass2;
}());
// 像这样,把数据类型改成泛型就可以了
// 然后使用类实例化的时候,指定泛型即可
var m1 = new MinClass2();
m1.add(7);
m1.add(12);
m1.add(13);
m1.add(6);
// alert(m1.min())
var m2 = new MinClass2();
m2.add('c');
m2.add('dd');
m2.add('a');
m2.add('z');
// 2.记住,实现函数接口的时候,也要使用泛型,而不能使用具体的类型
var setData = function (value) {
    return value;
};
// 2.使用函数声明式的写法进行泛型,而不是变量赋值类型方法声明泛型
// 但是这个时候,setData2 还和 configFn2 没有关联
function setData2(a) { return a; }
// 3.将 函数接口和 实现函数 关联结合起来
var sd2 = setData2;
// alert(sd2('第二种泛型写法~~'))
// 感觉这样有点绕,相当于把第一种的第二部,拆解成了这里的 2、3步骤
// 注意第一第二种泛型写法的区别之处
// 1------一个步骤
// var setData: configFn = function<T> (value: T): T {
//   return value
// }
// 2------ 分为两步,结合
// function setData2<T> (a: T):T { return a }
// var sd2:configFn2<string>  = setData2
// 这里 sd2:configFn2<string> 的时候就指定了 <string>类型
// 所以后面调用的时候,不在需要指定泛型的类型了
// 因此第一种调用:
// alert(setData<string>('123'))  这里要加泛型的指定<string>
// 第二种调用
// alert(sd2('第二种泛型写法~~'))  这里直接调用传参即可
// ------泛型类的拓展
// 泛型可以帮助我们避免重复代码
// 以及对不特定数据类型的支持(类型校验)
// 把类当参数的泛型类
// 1.定义一个类
// 2.把类作为参数来约束数据传入的类型
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (user) {
        console.log(user);
        return true;
    };
    return MysqlDb;
}());
var u = new User();
u.password = '123';
u.userName = 'test';
var db = new MysqlDb();
db.add(u);
// 但是这种情况,每改动一次存储类的类型
// 就要改动一次封装的 mysqldb
// 因此,使用泛型解决这个问题
var MysqlDb2 = /** @class */ (function () {
    function MysqlDb2() {
    }
    MysqlDb2.prototype.add = function (t) {
        console.log(t);
        return true;
    };
    MysqlDb2.prototype.update = function (t, id) {
        console.log(id, t);
        return true;
    };
    return MysqlDb2;
}());
var User2 = /** @class */ (function () {
    function User2() {
    }
    return User2;
}());
var u2 = new User2();
u.password = '456';
u.userName = '张三';
var db2 = new MysqlDb2();
db2.add(u);
// 再定义一个其他类
var Article = /** @class */ (function () {
    function Article(param) {
        this.title = param.title;
        this.desc = param.desc;
        this.content = param.content;
    }
    return Article;
}());
var a1 = new Article({
    title: '文章',
    desc: '新闻',
});
var db3 = new MysqlDb2();
db3.update(a1, 3);
// 这里实现接口的泛型,类也要加上泛型
var MysqlDbImp = /** @class */ (function () {
    function MysqlDbImp() {
    }
    MysqlDbImp.prototype.add = function (t) {
        throw new Error("Method not implemented.");
    };
    MysqlDbImp.prototype.update = function (t, id) {
        throw new Error("Method not implemented.");
    };
    MysqlDbImp.prototype.del = function (t) {
        throw new Error("Method not implemented.");
    };
    MysqlDbImp.prototype.get = function (t) {
        throw new Error("Method not implemented.");
    };
    return MysqlDbImp;
}());
var OraDbImp = /** @class */ (function () {
    function OraDbImp() {
    }
    OraDbImp.prototype.add = function (t) {
        throw new Error("Method not implemented.");
    };
    OraDbImp.prototype.update = function (t, id) {
        throw new Error("Method not implemented.");
    };
    OraDbImp.prototype.del = function (t) {
        throw new Error("Method not implemented.");
    };
    OraDbImp.prototype.get = function (t) {
        throw new Error("Method not implemented.");
    };
    return OraDbImp;
}());
