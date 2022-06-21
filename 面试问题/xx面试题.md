
## es新特性


1、 Array.prototype.includes()
[1].includes(1);  // true

2、指数操作符

2**10; // 1024



2、Object.values()：对象转数组
Object.values({a: 1, b: 2, c: 3});      // [1, 2, 3]

3、 Object.entries()：对象转数组，并解析出 key value


1、Array.flat() 和 Array.flatMap()
平坦的（）：把数组里的数组打开
[1, 2, [3, 4]].flat(Infinity);       // [1, 2, 3, 4]
平面图（）
[1, 2, 3, 4].flatMap(a = [a**2]);     // [1, 4, 9, 16]




Promise.allSettled
Promise.any

## interface 和 type 的区别

1.interface侧重于描述数据结构，type侧重于描述类型
2.不同于interface只能定义对象类型，type声明还可以定义基础类型、联合类型或交叉类型。


差异点
1.定义类型范围

interface只能定义对象类型。
而type声明可以声明任何类型，包括基础类型、联合类型或交叉类型

2.扩展性

扩展和实现(extends & implement)
interface可以扩展，type可以通过交叉实现interface的extends行为
interface可以extends type，同时type也可以与interface类型交叉



3.映射类型

type aaa = 'name' | 'sex'

type Dukey = {
  [key in aaa]: string // 类似 for in
}

let stu: Dukey = {
  name: 'wang',
  sex: 'male'
}

// 意思就是 用快捷的方式，声明 dukey 里面的属性要包含 aaa里面 所有的 属性



4.导出方式不同



## es5继承

原型链继承
这样我们就实现了Child继承Parent的属性和方法，但是调用父类的方法我们发现，
我们无法传值到父类里面，也就是父类的构造函数接收不到我们的传值，这也是原型链继承的一个弊端。



构造函数继承
想实现构造函数继承我们不得不依赖call或者apply，通过改变this指向



组合继承
顾名思义，组合继承就是既有原型链继承又有构造函数继承，
这样既能解决不能传值的问题，也解决了不能共有的属性和方法



但是这里又增加了一个新问题：通过注释我们可以看到 Parent3 执行了两次，第一次是改变Child3 的 prototype 的时候，
第二次是通过 call 方法调用 Parent3 的时候，那么 Parent3 多构造一次就多进行了一次性能开销，这是我们不愿看到的。



第四种：原型式继承



那么关于这种继承方式的缺点也很明显，多个实例的引用类型属性指向相同的内存，存在篡改的可能，接下来我们看一下在这个继承基础上进行优化之后的另一种继承方式——寄生式继承。



https://blog.csdn.net/CRMEB/article/details/115490515


es6的继承主要是extends关键字，这比es5 的实现继承，要清晰和方便很多。

es6就是寄生式组合继承




## 小数精度问题

https://www.cnblogs.com/zm-blogs/p/12909096.html




