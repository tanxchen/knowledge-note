```html
// 事件捕获被阻止，alert 不会生效
// 可用于fix 阻止子组件的点击事件，当disabled使用
<div @click.capture.stop="">
  <div @vclick="alert(123)">213</div>
</div>
```