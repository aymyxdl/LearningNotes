vue3为什么使用proxy代理?

Object.defineProperty的缺点
1.深度监听需要一次性递归 (遍历每个对象的每个属性，如果对象嵌套很深的话，需要使用递归调用。)
2.无法监听新增属性/删除属性(Vue.set Vue.delete，未在 data 中定义的属性会报 undefined)
3.无法原生监听数组，需要特殊处理
4.无法处理map，set等数据结构



proxy优点:
1.可以直接监听对象而非属性
2.可以直接监听数组的变化
3.proxy有13种拦截处理，比boject.defineProperty 强很多
4.返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改


------

为什么需要配合reflect使用


Reflect 中的 receiver 参数可以把属性访问中的 this 指向 receiver 对象。


总结
看到这里，相信大家都已经明白了，为什么 Proxy 一定要配合 Reflect 使用。就是为了触发代理对象拦截操作时，保持正确的 this 指向。
Proxy 中接受的 receiver 形参，表示代理对象本身 或者 继承了代理对象的对象。
Reflect 中传入的 recriver 实参，表示修改执行原始操作时的 this 指向。










