// 暴露一个函数 module.exports = function() {}
module.exports = function () {
  console.log('module2');
}

// 虽然可以写,但是上面的就没用了, 因为 {} 覆盖了 exports 这个属性
// module.exports = {}