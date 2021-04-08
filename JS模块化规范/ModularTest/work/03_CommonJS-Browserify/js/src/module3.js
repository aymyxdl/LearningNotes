//  exports.xxx = value
exports.foo = function () {
  console.log('foo() module3');
};

// 使用 exports.xxx 这种方法可以无限往 exports这个对象中添加属性
exports.bar = function () {
  console.log('bar() module3');
};

exports.arr = [1, 3, 4, 3, 3, 5, 2, 11];
