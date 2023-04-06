function Foo() {
  getName = function () { alert(1) }
  return this
}

Foo.getName = function () { alert(2) }

Foo.prototype.getName = function () { alert(3) }

var getName = function () { alert(4) }

function getName () { alert(5) }


Foo.getName()     // 2

getName()         // 4   卧槽，忘了这里有变量提升

Foo().getName()      // 1   这里一定要注意，函数里面没有var，会导致变量提升到全局

getName()            // 1   上面刚刚已经把全局的方法重新赋值了

new Foo.getName()    // 2 这里一定要注意，相当于 new (Foo.getName) ()  
//                        但是，请不要以为 Foo.getName 返回的是undefined，不不不，Foo.getName 是一个函数，相当于 new 函数 ()
//                        我们这里 Foo.getName 的时候，不会调用函数，所以alert(2) 不是这个时候执行的
//                         而是 new 函数 () 的时候才会调用这个函数，因此，不是想象中的 new undefined ()这种情况

new Foo().getName()     // 3   这里要注意的是 new Foo() 和 new Foo 的区别
//                      别看 Foo 函数里面返回了一个 this，一不小心就着道了 
//                       var a = new Foo()     这里的 a 是实例，不会接收返回的this
//                       var b = Foo()         这里调用函数，才会接收返回的this
//                       console.log(a)
//                       console.log(b)


new new Foo().getName()   // 3  这里其实和上一个差不多
// new new Foo()  的时候 发现是  new ( new Foo() ) 
// 发现碰到了点，变成了 new  ( ( new Foo() ) .getName ) ()





// ()           优先级最高-这里的()表示的是小括号，而不是函数调用
// 成员访问      第2
// new ()       第3(带参 new)   ，所以如果只有一个(), 那就执行new
// 函数调用      第4，同理，如果只有一个(),new优先级高，看作是new(),而不是函数调用
// new          第5(无参 new)


