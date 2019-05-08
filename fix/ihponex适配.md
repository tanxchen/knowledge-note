```css
/** 1.viewport meta 标签增加属性viewport-fit=cover */
<meta name="viewport" content="width=device-width, viewport-fit=cover, xxxx">

/**
 * iphoneX等iphone有刘海机型底部summit按钮适配
 */
@supports (bottom: constant(safe-area-inset-bottom)) or (bottom: env(safe-area-inset-bottom)) {
  /** body元素增加适配样式 */
  body {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  /** 如有fixed底部的元素，也增加上面样式 添加background-color，不然会出现透明镂空的情况*/
  .fix-iphonex-btn {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #fff;
  }
}
```

[webkit 相关资料 link](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)