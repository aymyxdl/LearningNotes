hash # 模式：对应 history interface 中的 HashHistory
HashHistory.push() 和 HashHistory.replace()


history 模式：对应 history interface 中的 HTML5History

通过back(), forward(), go()等方法
从HTML5开始，History interface有进一步修炼：pushState(), replaceState() 
这下不仅是读取了，还可以对浏览器历史记录栈进行修改：


nodejs 对应 history interface 中的 AbstractHistory





根据不同的模式，返回对应不同的实例，这里运用了工厂模式

