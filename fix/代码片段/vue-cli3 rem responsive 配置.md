### rem
```js
// responsive.js
(function (window, document) {
  function resize() {
    let ww = window.innerWidth
    if (ww > window.screen.width) {
      window.requestAnimationFrame(resize)
    } else {
      if (ww > 720) {
        ww = 720
      }
      // set 1rem based on iPhone6 750px width, 750/7.5=100
      document.documentElement.style.fontSize = ww / 3.75 + 'px'
      // document.documentElement.style.fontSize = ww / 7.5 + 'px';
      document.body.style.opacity = 1
    }
  }
  if (document.readyState !== 'loading') {
    resize()
  } else {
    document.addEventListener('DOMContentLoaded', resize)
  }
  window.addEventListener('resize', resize)
})(window, document)
```
```js
// .postcssrc.js
module.exports = (ctx) => ({
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100,
      propWhiteList: []
    }
    // 根据开发环境配置
    // ctx.env !== 'production' ? {
    //   // If you modify rootValue, you also need to modify rem in static/responsive.js
    //   rootValue: 100, // 1rem=100px
    //   propWhiteList: []
    // } : false
  }
})
```
先安装 `postcss-pxtorem`，在入口.js里引入 `import './responsive.js'`

### vw
```css
$vm_fontsize: 75;
@function rem($px) {
  @return ($px / $vm_fontsize ) * 1rem;
}
$vm_design: 750;
html {
  font-size: ($vm_fontsize / ($vm_design / 2)) * 100vw; 
  @media screen and (max-width: 320px) {
    font-size: 64px;
  }
  @media screen and (min-width: 540px) {
    font-size: 108px;
  }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
  max-width: 540px;
  min-width: 320px;
}
```
