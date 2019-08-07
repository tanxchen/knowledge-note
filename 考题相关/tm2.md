#### 输入一个数，求是否是质数
```js
// 穷举
function isPrime (number) {
  if (number < 2) return false
  
  for (let i = 2; i <= number - 1; i++) {
    if (number % i === 0) {
      return false
    }
  }
  return true
}
```
#### 给一个数，格式化为万分位显示 【1234567 => 123,4567】

#### this 考察
```js
var a = 3;
var foo = {
  a: 2,
  b: function () {
    return this.a;
  }
}
var bar = foo.b;
console.log(foo.b());
console.log(bar());
```
#### 项目里用了哪些 es6 知识点，列出来
let、const、Map、Set、Class、解构（...）、模板字符串、=>、Promise
#### 实现一个搜索组件（输入关键字，结果列表里与关键字相同的文字需高亮）
