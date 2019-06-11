Q：如何防止Vuex里的数据在页面刷新时丢失？
A：思路：在每次mutation里修改数据时，将数据存储到 sessionStorange 里，在 create 里取出数据重新赋值。
更优形式：通过Vuex plugin的形式对数据进行保存和初始化。
可使用插件轮子 [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)
```js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Sotre({
  state: {...},
  actions: {...},
  mutations: {...},
  plugins: [
    createPersistedState()
  ]
})
```

分析下 vuex-persistedstate v0.1 版本插件最原始代码：
```js
import merge from 'lodash.merge'
import objectPath from 'object-path'

export default function createPersistedState ({
  key = 'vuex',
  paths = []
} = {}) {
  return store => {
    const persistedPaths = ['auth0.idToken']
    const persistedState = JSON.parse(localStorage.getItem(key))

     store.replaceState(merge({}, store.state, persistedState))

     store.subscribe((mutation, state) => {
      localStorage.setItem('vuex', JSON.stringify(persistedPaths.reduce((substate, path) => {
        objectPath.set(substate, path, objectPath.get(state, path))
        return substate
      }, {})))
    })
  }
}
```
[先看下 Vuex 插件文档](https://vuex.vuejs.org/zh/guide/plugins.html)
思路：Vuex插件，是个函数，接收 store 为参数，通过 store.replaceState 将存储的数据与原始 state 进行合并。
之后通过 subscribe 方法，传入被订阅的函数（subscribe 方法采用了发布/订阅设计模式），
该方法接收我们 mutation, state 参数（mutation = { type, payload }），
由于被 mutation 订阅了，所以在执行 mutation handler 后，会触发 我们插件里的更新函数，这时便可对之前存储的数据进行更新。
[参考vuex-persistedstate v0.1.0](https://github.com/robinvdvleuten/vuex-persistedstate/blob/v0.1.0/src/plugin.js)

> 注意：使用 sessionStorage 存储数据时，在通过 a 标签的 _target='blank' 等方式打开新页面，之前 存储的 sessionStorage 是能取到的，但通过手动输入 url 打开相同页面，sessionStorage 里的数据是不共享的。
