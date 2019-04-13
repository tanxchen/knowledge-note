```js
Function.prototype.bind2 = function(context) {
  var _this = this;
  var argsParent = Array.prototype.slice(arguments, 1);
  return function() {
    var args = argsParent.concat(Array.prototype.slice(arguments)); //转化成数组
    _this.apply(context, args);
  };
}
// or
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  const _this = this
  const args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```