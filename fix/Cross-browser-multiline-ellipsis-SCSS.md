```scss
/* mixin for multiline */
@mixin multiLineEllipsis($lineHeight: 1.2em, $lineCount: 1, $bgColor: white){
  overflow: hidden;
  position: relative;
  line-height: $lineHeight;
  max-height: $lineHeight * $lineCount; 
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
  &:before {
    content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
  }
  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: $bgColor;
  }
}

.block-with-text {
  @include multiLineEllipsis($lineHeight: 1.2em, $lineCount: 3, $bgColor: white);  
}
```

or css after build
```css
/* mixin for multiline */
.block-with-text {
  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: 3.6em;
  text-align: justify;
  margin-right: -1em;
  padding-right: 1em;
}

.block-with-text:before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}

.block-with-text:after {
  content: '';
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white;
}
```

[参考知乎专栏 link](https://zhuanlan.zhihu.com/p/34326190)
[参考 codepen link](https://codepen.io/natonischuk/pen/QbGWBa)