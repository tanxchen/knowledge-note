#### 1.下面输出什么？为什么？
```js
var a = 1;
function b () {
  console.log(a);
  var a = 2;
}
b();
console.log(a);
// undefined
let a = 1;
function b () {
  console.log(a);
  let a = 2;
}
b();
console.log(a);
// ReferenceError
const a = 1;
function b () {
  console.log(a);
  const a = 2;
}
b();
console.log(a);
// ReferenceError
```
#### 2.`typeof` 有几种返回结果，`typeof typeof a` 结果是什么？[是 string]
* 'undefined'
* 'boolean'
* 'number'
* 'string'
* 'object'
* 'function'
* 'symbol'
7种
#### 3.手写无限左右移动的css动画。
#### 4.export export default 区别
#### 5.数组去重的几种实现方式
#### 6.手写中国大陆手机验证正则表达式
```js
/^1(3|4|5|6|7|8|9)[0-9]\d{8}$/
```
#### 7.setTimeout promise then 执行顺序结果考察
#### 8.箭头函数考察
```js
function foo() {
  var bar = () => { console.log(this) }
  return bar
}
var xx = foo()
xx.call({ a: 1 })
xx.bind({ b: 2 })
```
#### 9.请求一必须等待请求二返回结果后才能发送的实现代码。
1）.promise 实现方式
```js
// promise 实现方式
http1 () {
  return new Promise(resolve, reject) {
    // ...ajax request
    resolve()
  }
}
http2 () {
  // ...ajax request
}
//
submit () {
  this.http1()
    .then(() {
      this.http2()
    })
}
```
2）async await 实现方式
```js
async submit () {
  await http1()
  await http2()
}
```
3) 嵌套调用请求
```js
http1 () {
  $.ajax({
    //...
    success () {
      http2()
    }
  })
}
```
#### 10.cookie、localStorage、sessionStorage区别和具体增删改查代码手写。
#### 11.(三选一)
  * 快速排序
  * 冒泡排序
    - ```js
        // 步骤
        //* 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
        //* 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
        //* 针对所有的元素重复以上的步骤，除了最后一个。
        //* 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

        // 实现
        function sortSmallToBig(arr) {
          console.time();
          let tmp = null;
          for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j > 0; j--) {
              if (arr[j] < arr[j - 1]) {
                [ arr[j - 1], arr[j] ] = [ arr[j], arr[j - 1] ]
              }
            }
          }
          console.timeEnd();
          return arr;
        }
      ```
  * 函数柯理化的实现 - 需要传入对个参数的函数变为一次传入一个参数达同样效果
    - ```js
      function a (x) {
        return function (y) {
          console.log(x + y)
        }
      }
      a(1)(2);
      ```
#### 12.vue定义组件有哪几种方式？路由里必须写哪些属性？
#### 13.跨域出现原因？有哪些解决方式？


提问：
* vue响应式原理
* vuex源码
* data数据是数组修改里面的值是否会成功更新DOM
* webpack使用，插件实现方式
* axios使用
* css 水平垂直居中实现的几种方式
* 性能优化方案
