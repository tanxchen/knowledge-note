### flex布局让图片等比缩放
```html
<div class="parent">
  <img :src="imgSrc" alt="">
</div>

<style lang="stylus" scoped>
.parent {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  
  img {
    width :100%;
    height: auto;
  }
}
</style>
```
手机横屏的时候，使用媒体查询适配
```css
@media (orientation: landscape) {
  img {
    width auto
    height 100%
    margin auto
  }
}
```