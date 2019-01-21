## BFC概念
块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。是CSS2.1规范定义的内容。

**下列方式会创建块格式化上下文：**

* 根元素或包含根元素的元素
* 浮动元素（元素的 `float` 不是 `none`）
* 绝对定位元素（元素的 `position` 为 `absolute` 或 `fixed`）
* 行内块元素（元素的 `display` 为 `inline-block`）
* 表格单元格（元素的 `display`为 `table-cell`，HTML表格单元格默认为该值）
* 表格标题（元素的 `display` 为 `table-caption`，HTML表格标题默认为该值）
* 匿名表格单元格元素（元素的 `display`为 `table`、`table-row`、 `table-row-group`、t`able-header-group`、`table-footer-group`（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 `inline-table`）
* overflow 值不为 `visible` 的块元素
* display 值为 `flow-root` 的元素
* contain 值为 `layout`、`content`或 `strict` 的元素
* 弹性元素（`display`为 `flex` 或 `inline-flex`元素的直接子元素）
* 网格元素（`display为` `grid` 或 `inline-grid` 元素的直接子元素）
* 多列容器（元素的 `column-count` 或 `column-width` 不为 `auto`，包括 `column-count` 为 1）
* `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

*块格式化上下文包含创建它的元素内部的所有内容.*

> 根元素即为一个BFC

### 特性

* 属于同一个BFC的两个相邻Box的margin会发生重叠，与方向无关，仅保留较大的margin值
* 消除与浮动元素的重叠
* 可制造内部浮动（计算BFC的高度时，浮动子元素也参与计算）
* 每个元素的margin-left，与包含块border-left相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此（见demo里的part3）。
### demo
[demo](https://codepen.io/ryanxchen/pen/OdLbwq)

### 总结
BFC是文档内元素显示的一种形式，概念有点抽象,可想像成在文档里为一个密闭的空间，与外部进行了隔离。在默认情况下，根元素即为BFC。所以在根元素内部的元素垂直方向会产生margin重合，浮动元素会产生元素重叠，BFC可消除元素内的子元素浮动产生的不包含情况等特性。

[参考MDN链接](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)