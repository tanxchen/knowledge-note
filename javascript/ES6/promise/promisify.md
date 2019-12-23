有的时候，我们需要将 callback 语法的 API 改造成 Promise 语法，为此我们需要一个 promisify 的方法。

因为 callback 语法传参比较明确，最后一个参数传入回调函数，回调函数的第一个参数是一个错误信息，如果没有错误，就是 null，所以我们可以直接写出一个简单的 promisify 方法：

```js
function promisify(original) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push(function callback(err, ...values) {
        if (err) return reject(err)

        resolve(...values)
      })
      original.call(this, ...args)
    })
  }
}
```
or
```js
function promisify(func) {
  return function (...args) {
    return new Promise( (resolve, reject) => {
      let callback = function(...args) {
        resolve(args)
      }
      // 给func函数主动塞入一个callback，这样在func中调用callback的时候实际执行的时候就是
      // 我们这里定义的callback函数，然后在我们的callback中调用resolve,
      // 这样一来，本来想要通过回调执行的操作就可以放在then函数中进行执行了
      func.apply(null, [...args, callback])
    })
  }
}
```

使用：
```js
// foo 可以是任何需要调用回调函数的函数
function foo (str1, str2, callback) {
  setTimeout( () => {
    console.log('setTimeout')
    // callback函数是通过最后一个参数这个位置来识别的，与callback这个名字无关
    callback(str1, str2)
  }, 1000)
}

// 这里的agent已经不是foo函数，而是我们在promisify中返回的自定义匿名函数
// 所以不需要纠结是否传入callback函数。
let agent = promisify(foo)

agent('hello', 'world')
  .then( res => {
    console.log(res)
  })
```

输出：
```js
setTimeout
[ 'hello', 'world' ]
```