**preload**
  * 预加载、不阻塞的加载
  * preload 是一个声明式 fetch，可以强制浏览器在不阻塞 document 的 onload 事件的情况下请求资源。
  * 加载资源一般是当前页面需要的

**Prefetch**
  * 预读取
  * Prefetch 告诉浏览器这个资源将来可能需要，但是什么时间加载这个资源是由浏览器来决定的。
  * 加载的一般是其它页面有可能用到的资源

Chrome 有四种缓存: 
  * HTTP 缓存
  * 内存缓存
  * Service Worker 缓存
  * Push 缓存

preload 和 prefetch 都被存储在 HTTP 缓存中。

使用 preload 来获取当前需要任务否则使用 prefetch 来获取将来的任务，不要一起用。

在 vue-cli 3.0 里使用了 `preload-webpack-plugin` 的一个 webpack plugin 实现了 preload 和 prefetch 的功能，其 Fock 自 [GoogleChromeLabs/preload-webpack-plugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin)。

项目 build 后生成如下代码：
```html
<!-- 其他代码... -->
<link href="/static/css/app.9a1577bb.css" rel="preload" as="style">
<link href="/static/js/app.d488621e.js" rel="preload" as="script">

<link href="/static/js/chunk-feeb.d4843990.js" rel="prefetch">
<!-- 其他代码... -->
```

[参考：Web 性能优化：Preload,Prefetch的使用及在 Chrome 中的优先级](https://github.com/qq449245884/xiaozhi/issues/30)