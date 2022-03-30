// 命名空间


// 在代码量较大的情况下，为了避免各种变量命名相冲突，可将代码放到各自的命名空间内


// 命名空间和模块的区别：

// 命名空间：内部模块，主要用于组织代码，避免命名冲突
// 模块：ts的外部模块的简称，侧重代码的复用，一个模块里可能会有多个命名空间





// 命名空间内部的变量，属性等 默认是私有的
// 外部想要访问，也需要export



// 命名空间说开了，其实就是避免同名函数起冲突
// 比如这个文件有两个人维护
// 两个人都写了一个 class Dog


namespace A {

  interface Animal {
    name: string;
    eat(): void;
  }

  // 需要导出
  export class Dog implements Animal {
    name: string;
    constructor (name: string) {
      this.name = name
    }

    eat():void {
      console.log(this.name + '喜欢吃狗粮');
    }
  }
}


namespace B {
  
  interface Animal {
    name: string;
    eat(): void;
  }

  export class Dog implements Animal {
    name: string;
    constructor (name: string) {
      this.name = name
    }

    eat():void {
      console.log(this.name + '却喜欢吃关东煮');
    }
  }
}

let da = new A.Dog('小花')
da.eat()

let dbb = new B.Dog('小红')
dbb.eat()


// 这样,命名空间就避免了两个Dog类的冲突



// 同时,也可以再次导出 A 和 B
// 所以,一个模块内可以有多个命名空间
export { A, B }































