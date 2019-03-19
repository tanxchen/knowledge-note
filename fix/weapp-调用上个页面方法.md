非常规操作之微信小程序调用上一个页面的方法：
```js
// getCurrentPages()获得路由组成的数组
const pages = getCurrentPages();  
// 获得倒数第二位，即上一个页面实例    
const lastpage = pages[pages.length - 2]
// lastpage.route即为上一个页面的路径  
if (lastpage.route === 'pages/webview/webview') {   
  // 可以调用上一个页面的change方法   
  lastpage.change();        
 }
```