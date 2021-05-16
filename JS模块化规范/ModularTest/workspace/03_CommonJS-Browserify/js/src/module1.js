// module.exports = vaule 暴露一个对象
module.exports = {
  msg: 'mudule1',
  foo() {
    console.log('foo()', this.msg);
  }
}