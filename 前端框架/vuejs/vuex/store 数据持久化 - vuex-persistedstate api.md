使用 `vuex-persistedstate` 对使用 vuex 时，在页面刷新情况下，对数据持久化

[v2.5.4 版本](https://github.com/robinvdvleuten/vuex-persistedstate/tree/v2.5.4)
```sh
npm install vuex-persistedstate -S
# or
yarn add vuex-persistedstate
```
API：
```js
new Vuex.Store({
  // state,
  // mutations,
  // getters,
  plugins: [
    createPersistedState({
      // options
      key <String>：：存储持久状态的键。（默认：vuex）
      paths <Array>：部分持久化状态的任何路径的数组。如果没有给出路径，则保持完整状态。（默认：[]）
      reducer <Function>：将调用的函数，用于根据给定路径减少要保留的状态。默认包含值。
      subscriber <Function>：一个调用设置变异订阅的函数。默认为store => handler => store.subscribe(handler)
      storage <Object>：用于代替（或与其组合）getState和setState。默认为localStorage。
      getState <Function>：将被调用以补充先前持久状态的函数。默认使用storage。
      setState <Function>：将被调用以保持给定状态的函数。默认使用storage。
      filter <Function>：将被调用以过滤setState最终将在存储上触发的任何突变的函数。默认为() => true
      arrayMerger <Function>：用于在初始化状态下合并的函数。默认为function (store, saved) { return saved }（保存状态替换提供的状态）。
    })
  ]
})
```

使用cookie存储：
```js
new Store({
  // ...
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})
```