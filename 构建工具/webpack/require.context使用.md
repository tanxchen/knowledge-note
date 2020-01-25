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

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: getModules()
})

function getModules () {
  // 自动加载 global 目录下的 .js 结尾的文件
  const modulesContext = require.context('./modules', true, /\.js$/)
  return modulesContext.keys().reduce((moduleObj, module) => {
    const moduleName = module.replace('./', '').replace('.js', '')
    const moduleConfig = modulesContext(module)
    /**
    * 兼容 import export 和 require module.export 两种规范
    */
    const ctrl = moduleConfig.default || moduleConfig
    moduleObj[moduleName] = ctrl
    return moduleObj
  }, {})
}
```

[参考link](https://github.com/wuchangming/blog/blob/master/docs/webpack/require-context-usage.md)