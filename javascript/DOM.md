获取父节点、子节点、兄弟节点
* 访问父节点：parentNode
* 访问所有子节点：childNodes[注意兼容]
* 访问第一个子节点：firstChild
* 访问最后一个子节点：lastChild
* 访问下一个兄弟节点：nextSibling
* 访问前一个兄弟节点：previousSibling

```js
if (box.lastChild.nodeType !== 1) {
  return box.lastChild.previousSibling
} else {
  return box.lastChild
}
```
**nodeType**
> 用来区分不同类型的节点，比如 元素, 文本 和 注释
* 元素节点—1 `<span></span>`
* 属性节点—2 ~已弃用~
* 文本节点—3 `123`
* 注释节点—8 `<!-- 注释 -->`
* document—9
* DocumentFragment—11

节点的四个属性：
* nodeName:返回元素的标签名，大写，只读
* nodeValue:Text节点或Comment节点的文本内容，可读写
* nodeType:该节点的类型，只读(*)
* attributes:Elements节点的属性集合

节点方法：`Node.hasChildNodes()`

[参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType)