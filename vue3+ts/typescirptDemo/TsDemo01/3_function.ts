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
  return 'run2'
}


// ts中定义函数的方法


// 1.ts的声明方式
function run3(): string {
  return 'run3';   // 返回类型必须和声明时候设置的类型一致
}


// 匿名函数


// 1.ts的匿名函数方式
var run4 = function(): number {
  return 666;
}








// -----------


// ts中定义方法传参

function getInfo (name: string, age: number): string {
  return `${name} ---- ${age}`;
}

alert(getInfo('zhangsan', 20))



// 匿名方式

var getInfo2 = function (name: string, skill: string): string {
  return `${name} can ${skill}`;
}

alert(getInfo2('zhangsan', 'play games'))



// 没有返回值的方法

function getVoid(): void {}




// -----------

// 3.2、 方法可选参数
// es5里面 方法的实参和形参可以不一样，但是ts中必须一致，如果不一样，必须配置可选参数

// 使用 ? 来设置可选参数

function getInfo3 (name: string, age?: number): string {
  if (age) {
    return `${name} ---- ${age}`;
  } else {
    return `${name} ---- 年龄保密`;
  }
}

alert(getInfo3('zhangsan'))


// 注意，默认参数必须在参数列表的最后面进行配置






// -----------

// 3.3、 默认参数


// es5里面不可以设置默认参数
// es6和ts都可以配置默认参数


function getInfo4 (name: string, age: number = 20): string {
  if (age) {
    return `${name} ---- ${age}`;
  } else {
    return `${name} ---- 年龄保密`;
  }
}

alert(getInfo4('zhangsan'))






// -----------

// 3.4、 剩余参数


function getSum(a:number, b:number, c:number): number {
  return a + b + c;
}

alert(getSum(1,2,3))

// 但是问题实际情况不仅仅只是局限于3个参数
// 所以参数的数量是可变的
// 因此我们可以使用 ... 运算符来收集剩余的参数合并成一个数组


function getSum2(...result:number[]): number {
  var sum = 0
  for( let i = 0; i < result.length; i += 1) {
    sum += result[i]
  }
  return sum
}

alert (getSum2(1,3,4,5,6))


// 当然也可以明确的指定前面几个参数，把后面的剩余参数收集起来

function getSum3(a:number, b: string, ...result:number[]): void {
}



// -----------

// 3.5、 函数重载

// Java中方法的重载：重载指的是两个或者两个以上的同名方法,
// 但它们的参数不一样，这时会出现函数重载的情况

// typescript中的重载，通过为同一个函数提供多个函数类型定义来实现多种功能目的

// ts为了兼容es5 以及 es6 重载的写法和java中有区别





// es5中出现同名方法，后面的会替换前面的方法


// ts中的重载
function getInfoTest(name: string): string
function getInfoTest(age: number): number
function getInfoTest (str:any):any {
  if (typeof str === 'string') {
    return 'i am xxx'
  } else {
    return str + 10
  }
}
// 这个怎么说呢？那就直接用any这个方法不行吗？还要多写两个声明
// 而且注意开始的两个方法，它们只有方法名称和返回值设定，而没有方法体（没有花括号）



// 上面是一个参数的重载，如果有多个参数

function getInfoTest2 (name: string): string

function getInfoTest2 (name: string, age: number): string

function getInfoTest2 (name: any, age?: any): any {

}





// -----------

// 3.6、 箭头函数 es6

// this指向的问题： 箭头函数里面的this指向上下文








