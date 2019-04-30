伪类：:hover,:focus,:first 一个冒号形式，表示某种状态的选择条件
伪元素：::before,::after 两个冒号形式，表示的是添加到选择器后面去选择某个元素的某个部分

> **:与::历史的演变：** <br>对于 CSS 2, 伪元素采用单冒号前缀语法. 因为伪类也是同样的语法,所以使得两者难以区分. CSS2.1 改变了伪元素的前缀语法可以解决这个问题. 现在伪元素采用双冒号前缀, 并且伪类仍然采用单冒号前缀.<br>
CSS2伪类单冒号语法已得到广泛支持时, 所有支持双冒号的浏览器同样也支持旧的单冒号语法.<br>
考虑浏览器兼容性的话, :first-letter 是一个更有效的选择; 否则, ::first-letter 更受欢迎.

[MDN-伪类与伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Pseudo-classes_and_pseudo-elements)