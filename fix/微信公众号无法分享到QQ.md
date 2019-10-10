```js
// 获取“分享到QQ”按钮点击状态及自定义分享内容接口
wx.onMenuShareQQ({
  title: document.title, // 分享标题
  /**
   * fix: 部分安卓机点击分享无效
   *  参考url：https://www.cnblogs.com/blogcxz/p/7341986.html
   */
  desc: document.title, // 分享描述
  shareUrl: window.location.host,
  link, // 分享链接
  imgUrl: shareLogo, // 分享图标
  success: function () {
    // 用户确认分享后执行的回调函数
  },
  cancel: function () {
    // 用户取消分享后执行的回调函数
  }
})
```

* desc 不为空
* 加上 shareUrl 且 shareUrl 和微信公众号上的js接口安全域名一致