var a = 25
var b = a
b = 18
console.log(a, b)





// var a                    (undefined)
// var b                    (undefined)
// a = 25
// b = a
// b = 18



// 这里先看有没有变量提升？ 发现不存在变量提升而带来的问题，继续往下看
// 发现这个考察的是 赋值的问题，但是因为 a 和 b都是基础类型的变量（存放在栈里面，哪怕是赋值也是 重新拷贝一份值）
// 他这个本意应该是让你误以为这是 对象（引用类型）赋值， 地址引发的问题（浅克隆）



/* 


// 扩展一下 变量提升

// ---1

var a = 3;
function fn () {
    console.log(a);
    var a = 4;
};
fn();


// ---2

console.log(b);
fn2(); 
fn3(); 
var b = 3; 
function fn2 () {
  console.log('fn2()');
};

var fn3 = function () {
  console.log('fn3()');
};








// ====================== 解析
// console.log(b);     // undefined    变量提升
// fn2();              // 可调用        函数提升 
// fn3();              // 会报错,这个时候遵循的是变量提升

// var b = 3;          // 引申：这里在F12调试的时候，不可以打断点，是因为这一行并没有这条语句，其本质就是变量提升，放到了最开始赋值了
//                     // 代码实际在这一行，该做的早已经做完了，所以无法打断点
//                     // 补充：说错了，还是可以打断点的， 但是如果是 var b; 就不可以打断点了

// function fn2 () {
//     console.log('fn2()');
// };

// var fn3 = function () {
//     console.log('fn3()');
// };

 */






for (var i = 0; i <5; i++) {
  setTimeout(function() {
    console.log(i)
  }, i * 1000)
}





for (var i = 0; i < 3; i++) {
  (function(a){
    setTimeout(function() {
      console.log(a)
    }, 100)
  })(i)
}
