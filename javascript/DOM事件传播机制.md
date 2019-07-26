**概念：** 在事件传播期间，有三个阶段：捕获、目标和冒泡。默认情况下，事件处理程序在冒泡阶段执行（除非将 useCapture 设置为 true）。它从嵌套最深的元素向外传播。

---
这里从下面这道题目来理解事件机制：

***当您单击该段落时，日志输出是什么？***
```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>
```
* A: p div
* B: div p
* C: p
* D: div
<details>
  <summary><strong>答案</strong></summary>
  <strong>答案: A</strong>
</details>

---
**`event.target` vs `event.currentTarget`**
* target 指向触发事件监听的对象。
* currentTarget 指向添加监听事件的对象。

常用于实现事件委托情况。如一个菜单列表需要绑定点击事件时，不必给每个菜单绑定，只需给最外层元素绑定，如通过 `event.target.dataset.name` 来区分点击了哪个菜单。

```html
<ul>
  <li data-name="a">a</li>
  <li data-name="b">b</li>
  <li data-name="c">c</li>
</ul>

<script>
  document.querySelector('ul').onclick = function (e) {
    console.log(e.target.dataset.name); // a/b/c
    console.log(e.currentTarget); // ul
  }
</script>
```