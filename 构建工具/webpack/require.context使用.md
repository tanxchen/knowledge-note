what：require.context 可以用于通过正则匹配引入相应的文件模块
```js
require.context(directory, useSubdirectories, regExp)
```
require.context有三个参数：
* directory：说明需要检索的目录
* useSubdirectories：是否检索子目录
* regExp: 匹配文件的正则表达式

why：在注册组件或注册页面时，原先需手动导入每个文件，使用`require.context`可自动导入按规则匹配的文件。

how：
```js
const rootRoute = {
  childRoutes: [
    {
      path: '/',
      component: AppLayout,
      childRoutes: (r => {
          return r.keys().map(key => r(key));
      })(require.context('./', true, /^\.\/modules\/((?!\/)[\s\S])+\/route\.js$/))
    }
  ]
};
```

[参考link](https://github.com/wuchangming/blog/blob/master/docs/webpack/require-context-usage.md)