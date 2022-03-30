// es5的类通过构造函数来实现

// 1.最简单的类

// 2.构造函数和原型链里面增加方法


// 2.1 构造函数里面写方法
// function Person () {
//   this.name = '张三';  // 设置属性

//   this.run = function () {}    // 设置方法
// }

// var p = new Person();
// p.run()


// // 2.2原型链上面增加方法

// Person.prototype.sex = 'male'
// Person.prototype.work = function () {}
// var p2 = new Person()

// p2.run()
// p2.work()    // 调用原型链的方法

// 原型链上面的属性会被多个函数共享，构造函数不会





// 3.类里面的静态方法

// 构造函数里面 this.的方法叫做实例方法（必须new实例才能调用这个方法）

// Person.getInfo = function () {}  // 这个是类的静态方法
// // 此方法不需要通过实例调用，直接通过类调用即可
// person.getInfo()


// 4.es5里面的继承


// function Person2 (hobbit) {
//   this.name = '张三';  // 设置属性
//   this.hobbit = hobbit;
//   this.run = function () {}    // 设置方法：实例方法
// }

// Person2.prototype.sex = 'male'
// Person2.prototype.work = function() {}

// var p = new Person2();
// p.run()


// 如果需用用一个 web类 继承Person类
// es5里面一般用的比较多的是  原型链 + 对象冒充的组合继承模式

// function Web () {
//   Person2.call(this) // 对象冒充实现继承
// }


// var w = new Web()
// w.run()   // 对象冒充可以继承构造函数里面的属性和方法

// w.work()   // 但是对象冒充不能继承原型链里面的属性和方法,会报错


// ---------------

// function Web2 () {}
// Web2.prototype = new Person2()
// var w2 = new Web2()
// w2.run()
// w2.work()
// 会发现都能成功调用
// 原型链实现继承:可以继承构造函数里面的属性和方法
// 也可以继承原型链上面的属性和方法

// 但是这个也有新的问题:如果参数是传递进去的话,
// 这种单一的原型链是无法设置参数的(实例化子类的时候无法给父类传参)


// ------------

// 因此,最终会使用原型链和对象冒充的组合方式实现继承


// function Web3 (hobbit) {
//   Person2.call(this, hobbit)
//   // 对象冒充继承 实例化子类的时候,可以给父类传参
// }

// Web3.prototype = new Person2()
// var w3 = new Web3('soccer')
// w3.run()
// w3.work()



// 原型链 + 对象冒充 的另一种写法
// 将 Web3.prototype = new Person2() 改成
// Web3.prototype = Person2.prototype;






// ===========

// ts中的类

class Person {
  name: string; //属性  前面省略了public关键字
  constructor (n: string) { // 构造函数  实例化类的时候触发的方法
    this.name = n;
  }

  run(): void {
    alert(this.name)
  }
}



// 2、ts中实现继承 extends、 super

class Person2 {
  name: string;
  constructor (name: string) {
    this.name = name;
  }

  run(): string {
    return 'hello , im running'
  }
}


// 此时，有 web类 要继承 Person2

class Web extends Person2 {
  constructor(name: string) {
    super(name);      // 初始化父类的构造函数
    // 有extends就要super
  }
}

var w = new Web('jack')
alert(w.run())



// 1.子类继承父类的同时，也可以在类中扩展自己的属性和方法
// 2.如果子类有和父类的同名属性方法，那么会覆盖掉父类的



// ------------
// 3类里面的修饰符
// typescript里面定义属性的时候给我们提供了三种修饰符

/* 
    public： 共有： 在类里面、子类、类外面都可以访问
    protected：保护类型： 在类里面、子类里面可以访问，类外面无法访问
    private： 私有：类里面可以访问，子类、外面不能访问


    属性如果不加修饰符，默认就是public
*/

// 类，子类： 在类中直接用this.xxx 使用
// 外部：一般是指实例化的对象




// ===========
// 4、静态属性 静态方法



// es5中的静态属性和方法
// function Person3() {
//   this.run1 = function(){}  // 实例方法
// }

// Person3.run2 = function () {} // 静态方法
// Person3.name = 'xx'

// Person3.name; //静态属性的调用
// Person3.run2(); //静态方法的调用


// 一般会有疑问： 为啥有了构造函数里的方法，还需要有静态方法呢？






// ts里的静态属性和方法

class Person4 {
  public name:string;
  constructor (name: string) {
    this.name = name
  }

  static type: string;

  static print () {  // 在方法前面加上static 就变成了静态方法了
    alert('print 方法')
    // console.log(this.name)    // 错误
    // 静态方法是无法调用类型的普通属性的
    // 如果要调用，那么要将属性声明为静态属性

    console.log(this.type, Person4.type)
  }
}

// 一般不会用到静态方法，JQuery里面会用到



// =============
// 5、多态

// 多态：父类定义一个方法不去实现，让继承它的子类去实现
// 每一个子类有不同的表现
// 多态也是继承的一种表现（属于继承）
// 其实也就是子类重写父类的这个方法


// class Animal {
//   public name: string
//   constructor(name: string) {
//     this.name = name
//   }

//   eat () {}    // 声明了方法，但是不实现，让子类去各自实现
// }


// class Dog extends Animal {
//   constructor(name: string) {
//     super(name)
//   }

//   eat(): void {
//     console.log('狗吃肉')  // 这就是多态
//   }
// }



// class cat extends Animal {
//   constructor(name: string) {
//     super(name)
//   }

//   eat(): void {
//     console.log('猫吃老鼠')  // 这就是多态
//   }
// }

// 其实也就是子类重写父类的这个方法





// =============
// 6、抽象方法
// typescript中的抽象类，它是提供其他类继承的基类，不能直接被实例化
// 用 abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
// abstract抽象方法只能放在抽象类里面
// 抽象类和抽象方法用来定义标准，标准： Animal这个类要求它的子类必须包含eat方法


abstract class Animal {
  public name: string
  constructor(name: string) {
    this.name = name
  }


  abstract eat (): void   // 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现
}


// var ani = new Animal()  // 错误，抽象类无法被实例化

class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }

  // 抽象类的子类必须实现抽象类里面的抽象方法
  eat() { // 如果不实现eat方法，就会报错
    console.log('狗吃肉')
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name)
  }

  eat() { // 如果不是先eat方法，就会报错
    console.log('猫吃老鼠')
  }
}


// 抽象类就是用来定义标准的










