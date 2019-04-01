问题：ios的微信浏览器输入框失去焦点后页面不能回弹
解决：
```js
// fix ios 12 input position bug ---start
const mobileVersion = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
if (mobileVersion && (mobileVersion[1].replace(/_/g, '.').indexOf('12') === 0) && (/micromessenger/i).test(navigator.userAgent)) {
  this.ISIOS12INPUT = true
}
// fix ios 12 input position bug ---end
mobileBlurHandle () {
  this.ISIOS12INPUT && (document.body.scrollTop = document.body.scrollTop)
}
```