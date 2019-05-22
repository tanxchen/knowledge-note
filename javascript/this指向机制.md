谁调用了函数，this就指向谁，this即函数的调用者。

* 全局环境
  * 无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象。
* 函数（运行内）环境
  * 在函数内部，this的值取决于函数被调用的方式。
* 在严格模式下
  * 如果 this 没有被执行环境（execution context）定义，那它将保持为 undefined。

修改this指向的方式：
* call：
  * fun.call(thisArg, arg1, arg2, ...)
* apply：
  * func.apply(thisArg, [argsArray])
* bind：
  * function.bind(thisArg[, arg1[, arg2[, ...]]])
* 箭头函数：
  * =>

**经典练习题：**
```js
function Foo () {
  getName = function () { alert(1) }
  return this
}
Foo.getName = function () { alert(2) }

Foo.prototype.getName = function () { alert(3) }

var getName = function () { alert(4) }

function getName () { alert(5) }

//输入的值
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

<details>
  <summary>答案</summary>

  ```js
  Foo.getName(); //2
  getName(); //4
  Foo().getName(); //1
  getName();//1
  new Foo.getName(); //2
  new Foo().getName(); //3
  new new Foo().getName(); //3
  ```
</details>