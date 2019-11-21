1、
2、
3、
4、
```js
typeof undefined = 'undefined'
```
5、
```js
function foo () {
  return function () {
    console.log('foo')
  }
}

var bar = foo
console.log(bar)
// ƒ foo () {
//   return function () {
//     console.log('foo')
//   }
// }
console.log(bar())
// ƒ () {
//   console.log('foo')
// }
```
6、
```js
var k = 0;
for (var i = 0, j = 0; i < 10, j < 6; i++, j++) {
  k = i + j;
}
console.log(k); // 10
```
7、全局变量是哪些？

8、
9、变相闭包
```js
var a = []
for (let i = 0; i < 10; i++) {
  var c = i;
  a[i] = function () {
    console.log(c);
  }
}

a[6](); // 9
```

10、js 实现继承？

11、将字符串倒置
```js
str.split('').reverse().join('')
```
12、
```js
str.split()
```
13、Math,Array,String 常见的方法
14、
```js
if(0<100<0) ...
  * 解析：0 < 100 ==> true
  * true < 0 ==> 1 < 0 ==> false
if(0<100<(0+4)) ...
  * 解析：0 < 100 ==> true
  * true < 4 ==> 1 < 4 ==> true
```

other:
* 性能优化
* webpack配置
* 组件传参
* CSS3动画
* 从输入URL到展示页面的过程
* 异步实现
* 401：未认证
* 移动端适配有哪些
* 登录认证
* TS 有什么好处