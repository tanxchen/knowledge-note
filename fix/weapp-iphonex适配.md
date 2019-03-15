环境：微信小程序

问题：底部button fixed定位后，与iPhone X虚拟 HOME 键重叠

fix：使用css新属性，h5页面亦可使用，[参考链接](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)

> 经实践已知，最外层view标签上不能加，padding属性，否则无效，具体原因不明。
```html
<view style="position:fixed;bottom:0;left:0;right:0;" class="fix-iphonex-btn">
  <button>底部按钮</button>
</view>
```
```css
/*---- iphone X 底部位置适配 start ----*/
@supports (bottom: constant(safe-area-inset-bottom)) {
  Page {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .fix-iphonex-btn {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
  }
}

@supports (bottom: env(safe-area-inset-bottom)) {
  Page {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .fix-iphonex-btn {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
  }
}
/*---- iphone X 底部位置适配 end ----*/
```