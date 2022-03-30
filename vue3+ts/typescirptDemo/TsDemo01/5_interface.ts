// 接口 
// 接口的作用：在面向对象的变成中，接口是一种规范的定义，它定义了行为和动作的规范，
// 在程序设计里面，接口起到一种限制和规范的作用。
// 接口定义了某一批类所需要遵守的规范
// 接口不关心这些类的内部状态数据，也不关系这些类里面方法的实现细节
// 它只规定这批类里必须提供某些方法，提供这些方法的类就可以满足实际需要
// typescript中的接口类似于java，同时还增加了更灵活的接口类型
// 包括属性、函数、可索引和类等





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


function printLabel(labelInfo: { label:string }):void {
  console.log('printLabel');
}

printLabel({label: '666'})    // 正确的写法


// 但是实际中，一般都是对 批量方法 传入的参数 进行约束
// 这样上面那种写法就不是很方便
// 因此，可以使用接口



// 有这么一个场景，printName方法
// 1.必须传入对象 
// 2.对象必须要有 firstName 和 secondName
// 因此使用 interface 

interface FullName {
  firstName: string;    // 注意，接口是对象的写法
  secondName: string;   // 但是这里面是分号 ;
}

// 这个就是传入对象的约束（属性接口）


function printName (name: FullName) {
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
}
printName(obj)




// ===========
// 2、接口：可选属性

interface FullName2 {
  firstName: string;
  secondName?: string;  // 使用 ? 将属性变为可选属性
}



// ===========
// 3、函数类型接口： 对方法传入的参数 以及返回值进行约束

// 举例：加密的函数类型接口

interface encrypt {
  (key: string, value: string): string;  // 注意，这里的写法和属性的写法不一样
  // 这里是 (参数: 参数类型, 参数: 参数类型): 返回值类型
}


var md5:encrypt = function (key: string, value: string) {
  return key + value
}
// var md5:encrypt
// 这种接口的实现只能通过 变量赋值的时候进行接口限制吗？
// 如果通过函数声明方式来实现接口



// implements 是 class 来实现接口的

// 我不知道这种方式该在哪里加接口的实现
function sha1 (key: string, value: string):string {
  return key + value
}





// ===========
// 4、可索引接口： 数组或对象的约束(不常用)



/* 

ts定义数组的方式

var arr: number[] = [1,2,3]

var arrStr: Array<string> = ['123', '456']

*/

// 4.1 对数组的约束

interface UserArr {
  [index: number]: string    
  // index表示索引值，必须是数字类型，然后内容是string类型
}

var arr: UserArr = ['hello', 'world']



// 4.2 对对象的约束

interface UserObj {
  [index: string]: string
}

var objTest: UserObj = {
  name: 'zhang',
  sex: 'male',
  age: '20'
}




// ===========
// 5、类类型接口： 对类的约束 和 抽象类有点相似（很常用于这种情况）


interface Animals {
  name: string;
  eat(food: string): void
}


// 类类型接口，就相当于把之前的属性接口和方法接口整合了一下
// 就变成了类 类型接口


class Dogg implements Animals {
  name: string;
  constructor(name: string) {
    this.name = name
  }

  eat(food: string): void {
    console.log('dog eat food');
  }

  // 类实现接口的时候，预定的方法一定要实现
  // 但是方法的参数不需要完全一致
}


// 和抽象类相似，但是功能更强大，范围更广




// ===========
// 6、接口的扩展：接口可以继承接口


// interface AnimalT {
//   eat(): void
// }

// interface PersonT extends Animal {
//   run(): void
// }

// class WebT implements PersonT {
//   name: string;
//   constructor(name: string) {
//     this.name = name
//   }

//   eat():void {
//     console.log('动物吃东西');
//   }

//   run(): void {
//     console.log('人会跑');
//   }
// }





// ----------------
// 继承的同时 也实现接口

interface AnimalT {
  eat(): void
}

interface PersonT extends Animal {
  run(): void
}


class Programmer {
  name: string;
  constructor(name: string) {
    this.name = name
  }

  coding ():void {}
}


// 这里
class WebT extends Programmer implements PersonT {
  constructor(name: string) {
    super(name)
  }

  eat():void {
    console.log('动物吃东西');
  }

  run(): void {
    console.log('人会跑');
  }

  coding (): void {};
}


var wt = new WebT('张三')
wt.eat()
wt.coding()














