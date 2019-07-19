解决在 safari 浏览器里 使用 iframe 嵌入 h5 页面，使得 h5 页面的 cookie 被拦截问题。
在 h5 单页面的同级的 index.html 添加 `_safari_fix.html`。
```html
<!-- _safari_fix.html -->
<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <script>
    document.cookie = 'safari_cookie_fix=fixed; path=/;';
    console.log("safari fix has been applied");
    window.location.replace(document.referrer)
  </script>
</body>
</html>
```

[参考链接 github](https://github.com/vitr/safari-cookie-in-iframe)
[参考链接 gist](https://gist.github.com/iansltx/18caf551baaa60b79206)