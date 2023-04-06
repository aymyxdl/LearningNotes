Map与Set的用法和区别

一、基本概念

Map（字典）

官网解释：
Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值。

官网的这句话非常精炼，从上面这句话中总结如下几个关键词：
键值对
记住插入顺序
任意值作为键


一看到键值对，难免会想到对象。事实确实如此，Map 与我们平常所用的对象非常类似，它是一种类对象的数据结构，所以我们通常称它为 Map 对象。
但是我们可以把它说得更为官方一点：Map 字典。关于程序中字典的概念大家可以下去了解一下。


特点总结：

Map 对象这种数据结构和和对象类型，都已键值对的形式存储数据，即 key-vlue 形式。
Map 对象存储的数据是有序的，而我们平常使用的对象是无序的，所以通常当我们需要使用对象形式（键值对）存储数据且需要有序时，采用 Map 对象进行存储。
Map 对象的键值可以是任意类型，我们平时使用的对象  object 只能使用字符串作为键。


-----

Set（集合）

官网的解释：
Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

Set 的解释比 Map 的解释还要精炼，我们从中提取出几个关键词：
任何类型
唯一值


上面关键词中我们需要重点关注“唯一值”，这说明使用 Set 存储的数据是不会重复的，除此之外，Set 也是一个对象，但是它是一个类数组对象，也就是说它长得像数组，我们通常直接称它为 Set 对象。

当然也可以官方一点的称它：Set 集合。

特点总结：

Set 对象是一个类数组对象，它长得就很像数组。
Set 对象存储的值是不重复的，所以我们通常使用它来实现数组去重。
Set 对象存储的数据不是键值对的形式，而且它可以存储任何类型的数据。


二、基本使用


Map 基本使用
初始化 map 对象：
let myMap = new Map();

初始化 map 时传入数据：
由于 Map 对象是一个构造函数，所以我们在初始化的时候可以传入默认数据的，只不过我们需要注意传入默认数据的格式，它默认接收一个二维数组。

let defaultMap = new Map([['name', '张三'], ['age', 20]]);

-----

插入数据：

myMap.set('name', '小猪课堂'); // 字符串作为键
myMap.set(12, '会飞的猪'); // number 类型作为键
myMap.set({}, '知乎'); // 对象类型作为键


-----

获取长度：
我们传统的对象可以通过 Object.key().length 来获取对象长度，而 map 对象自带 size 属性获取对象长度。

let myMapSize = myMap.size;


-----

获取值：

let objKey = {};
myMap.set('name', '小猪课堂'); // 字符串作为键
myMap.set(12, '会飞的猪'); // number 类型作为键
myMap.set(objKey, '知乎'); // 对象类型作为键


let name = myMap.get('name');
let age = myMap.get(12);
let any = myMap.get(objKey);

console.log(name, age, any); // 小猪课堂 会飞的猪 知乎


-----

删除某个值：
myMap.delete('name');


判断某个值是否存在：
myMap.has('name'); // 返回 bool 值



总结：初始化 let map = new Map()


map.set()
map.get()
map.has()
map.delete()

map.clear()：清空对象中的条目


map.size      // 这个是属性，不是方法



-----


迭代Map对象

entries()：返回包含[key, value] 的迭代器        map.entries()
keys()：返回包含key的迭代器                     map.keys()
values()：返回包含value的迭代器                 map.values()
forEach()：传入迭代处理函数，遍历所有条目        map.forEach(item => {})
for..of 循环：和entries()函数的表现类似，循环内部对迭代器做了处理   for (let i of map) {}



------------

Set 基本使用

Set对象的使用方式和Map对象的使用方式非常的类似，只不过存储的数据格式不一样罢了。
这里需要注意的Set对象存储的不是键值对形式，它只存储了值，没有键，就和数组类似。

初始化Set对象：
let mySet = new Set();

初始化Set对象带有默认值：
和Map类似，Set初始化时也可以初始化默认数据。

let defaultSet = new Set(['张三', 12, true]);


-----

插入数据：

mySet.add(1);
mySet.add('小猪课堂');

-----

获取长度：

let mySetSize = mySet.size;

-----

获取值：
由于Set对象存储的不是键值对形式，所以未提供get方法获取值，我们通常遍历它获取值：

mySet.forEach((item) => {
  console.log(item)
})

-----

删除某个值：
mySet.delete(1);

-----

判断某个值是否存在：
mySet.has(1); // 返回Boolean值




总结：
初始化 let set = new Set();

set.add()
set.has()
set.delete()

set.clear()   // 清空集合中的所有值


set.size      // 这个是属性，不是方法


-----


迭代Set对象

keys()
values()
entries()
forEach()
for..of 循环
迭代Set对象和迭代Map对象类似。由于Set只有value，且接口要和Map保持统一，所以上述迭代方法都会将value当作key来处理。


-----------


三、Map和Set区别

如果我们学会了它们两者如何使用，或多或少都知道它们的区别在哪里，我们这里为大家总结一下它们的区别要点：

Map和Set查找速度都非常快，时间复杂度为O(1)，而数组查找的时间复杂度为O(n)。
Map对象初始化的值为一个二维数组，Set对象初始化的值为一维数组。
Map对象和Set对象都不允许键重复（可以将Set对象的键想象成值）。
Map对象的键是不能改的，但是值能改，Set对象只能通过迭代器来更改值。



-----------


四、使用场景介绍


Set对象使用场景

数组去重
这是大家很熟悉的一种场景，使用Set对象的唯一性值特性方便的给我们数组去重。

代码如下：
let arr = [1, 2, 3, 4, 5, 6, 3, 2, 5, 3, 2];
console.log([...new Set(arr)]); // [1, 2, 3, 4, 5, 6]

需要注意的是Set对象是一个类数组，我们使用...扩展运算符将一个类数组转化为了一个真正的数组。


-----

交集-并集-差集

因为 Set 结构的值是唯一的，我们可以很轻松的实现以下

let arr = [1, 1, 2, 3];
let unique = [... new Set(arr)];
 
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
    
// 并集
let union = [...new Set([...a, ...b])]; // [1,2,3,4]
    
// 交集
let intersect = [...new Set([...a].filter(x => b.has(x)))]; [2,3]
    
// 差集
let difference = Array.from(new Set([...a].filter(x => !b.has(x)))); [1]




-----


Map对象使用场景

数字类型充当键
代码如下：

let errors = new Map([
  [400, 'InvalidParameter'],
  [404, 'Not found'],
  [500, 'InternalError']
]);
console.log(errors);


我们可以使用Map对象建立一个请求状态码对象字典，因为状态码是数字类型，所以使用Map对象很合适。
除了该场景外，如果需要保证对象的顺序，那么也是可以使用Map对象的。



类型的转换

Map 转为 Array
// 解构
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log([...map])	// [[1, 1], [2, 2], [3, 3]]
 
// Array.from()
const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log(Array.from(map))	// [[1, 1], [2, 2], [3, 3]]


-----


Array 转为 Map

const map = new Map([[1, 1], [2, 2], [3, 3]])
console.log(map)	// Map {1 => 1, 2 => 2, 3 => 3}



-----


Map 转为 Object

function mapToObj(map) {
    let obj = Object.create(null)
    for (let [key, value] of map) {
        obj[key] = value
    }
    return obj
}
const map = new Map().set('name', 'vue3js.cn').set('age', '18')
mapToObj(map)  // {name: "vue3js.cn", age: "18"}


-----


Object 转为 Map

let obj = {"a":1, "b":2};




-----------



五、思考点
前面我们说Set和Map的插入删除效率为什么很高呢？
这里简单讲一下，更加深入需要大家自己下去好好学习一下数据结构了。


简述原因：
map和set存储的所有元素都是以节点的方式来进行存储的，这种节点结构和链表有点类似。
我们都知道链表的特点是插入和删除都非常快，时间复杂度为O(1)，两个节点通过指针相连，删除或者增加元素时，
我们只是重新更改了指针的指向，不像数组那样，掺入或删除之后需要重新排序。



