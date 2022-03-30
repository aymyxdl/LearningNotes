// typescript 的数据类型

// ts中为了代码更规范，使用了类型校验


/* 

  布尔类型（boolean）
  数字类型（number）
  字符串类型（string）
  数组类型（array）
  元组类型（tuple）
  枚举类型（enum）
  任意类型（any）
  null 和 undefined
  void 类型
  never 类型


*/

// -----------

// 布尔类型（boolean） true false


/* var a: boolean = true

// a = 'str'  错误写法
a = false */




// -----------


// 数字类型（number）

/* var a: number = 123
console.log(a)


// a = 'string' // 错误写法

// a = false // 错误写法

a = 12.3
console.log(a) */


// -----------



// 字符串类型（string）

/* var str: string = 'this is ts'
str = '456'
console.log(str) */



// -----------

// 数组类型（array） ts中定义数组有两种方式

// 不像es5可以随意定义 
// var arr = [1, '222', false]


// 1.第一种定义数组的方式
// 在ts中定义数组建议制定类型

let arr1: number[] = [1, 2, 3, 4]  // 这里只能放数字类型
console.log(arr1)

// 2.第二种定义数组的方式

// 使用泛型来定义

let arr2: Array<number> = [11, 22, 33]
console.log(arr2);




// -----------


// 元组类型（tuple） 属性数组的一种

// 属于数组的一种，可以指定数组中的数据类型

// let arr3:[string, number, boolean] = [true, 'str', 22]  // 位置类型必须严格对照

let arr3:[string, number, boolean] = ['str', 22, true]


// -----------

// 枚举类型（enum）

// 一般是用来定义标识符的
  // 主要用于标识状态以及固定值

  /*
    enum 枚举名{
      标识符[=整型常数],
      标识符[=整型常数],
      标识符[=整型常数],
      ...
      标识符[=整型常数],
    };


    pay_status 0 未支付 1 支付 2交易成功
    flag  1表示true   -1表示false
  */


    enum test1 { success = 1, error = -1}

    var f:test1 = test1.success
    console.log(f);
    

    // enum Color {red, blue, orange}
    // var c:Color = Color.blue
    // console.log(c);

    // // 如果枚举类型没有赋默认值，那么默认值就是索引值
    // // 比如red = 0, blue = 1, orange = 2


    // 第二种情况，某个值赋了默认值
    
    enum Color {red, blue = 5, orange}
    var c:Color = Color.blue
    console.log(c, Color.orange);

    // 这个时候，red = 0, blue = 5, orange = 6
    // 这是因为blue赋值的是数字，后面的默认+1
    // 但是，如果blue赋值的是其他的类型，那么后面的就不能默认不赋值，一定要给出确定的值




// -----------


// 任意类型（any）


var d: any = 1
d = 'str'
d = false

// 任意类型的用处

// var oBox = document.getElementById('box')
// oBox.style.color = 'red'  // 这样会警告报错
// 所以给oBox加上any类型的声明，就不会出错


var oBox: any = document.getElementById('box')
oBox.style.color = 'red'



    
// -----------

// null 和 undefined  ：是其他（never类型）数据类型的子类型

// var num2: number;
// console.log(num2);  // 会出问题，输出是 undefined， 报错



var num3: undefined;
console.log(num3); // 输出 undefined 正确

// 但是我们现在是undefined，后面要改成数字类型的话，怎么办？

var num4: number | undefined
console.log(num4)


// null 和 undefined一样

var num5: number | null | undefined




// -----------


// void类型：ts中的void表示没有任何类型，一般用于定义方法的时候没有返回值

// es5写法
function runner() {}


// es6写法
function runn(): void {}





// -----------

// nuver类型：是其他类型（包括null 和 undef）的子类型，代表从不会出现的值

// 这意味着声明never的变量只能被never类型所赋值



var ne1: never;
// ne1 = 123; // 错误在写法


ne1 = (() => {
  throw new Error('错误')
})()


// 这个never不是太懂，不过记住 never可以用来接收函数异常







