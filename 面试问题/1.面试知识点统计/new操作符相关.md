1.首先讲讲new操作符干了什么

比如 var p = new Person();

new 一个对象时，发生了四步(也有人说三步，其实就是第四步 合并在了第一步中)


var p = new Person()

1.创建一个新的空对象 var obj = {};  (创建一个空对象)
2.设置新对象的__proto__属性指向构造函数的prototype对象 (绑定该对象的原型)
  obj.__proto__ = Person.prototype;
3.使用新对象调用函数，函数中的this被指向新实例对象： (调用构造函数：执行构造函数中的代码)
  Person.call(obj)
4.将初始化完毕的新对象地址，保存到等号左边的变量中
  p = obj;



-------

2.上面讲了new 干了什么，接着来讲讲 new 操作符的优先级和 一些 属性调用[.]，方法调用 [()]在一起时，如何区分判断。
先说结论：


// ()           优先级最高-这里的()表示的是小括号，而不是函数调用
// 成员访问      第2
// new ()       第3(带参 new)   ，所以如果只有一个(), 那就执行new
// 函数调用      第4，同理，如果只有一个(),new优先级高，看作是new(),而不是函数调用
// new          第5(无参 new)




new Foo.getName() 
new Foo().getName()
new new Foo().getName() 

这三种情况的调用顺序如何才是正确的？

---

new Foo.getName()   => 因为属性调用 . 的优先级在这里最高，

第一步： 先执行 Foo.getName 
第二步： new X ()  这里要看作带参的new


因此相当于 new (   Foo.getName   ) () 


---


new Foo().getName() => 

第一步：带参优先级最高，因此是  new Foo()
第二部： X.getName() 这里是属性方法的调用


---

new new Foo().getName() 

第一步：带参的new => new Foo()

因此变成了 new X.getName()

第二步：这里属性调用. 优先级最高因此  X.getName 先调用

变成了 new Y()



