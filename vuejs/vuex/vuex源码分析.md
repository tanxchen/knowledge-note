Vuex是Vue的数据状态管理插件.将数据放在单例下的store里，对数据进行监控管理.
### 引入、安装阶段，从入口 index.js开始
```js
export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
```
导出了 Store 类和一些辅助map开头的函数。
最初在项目里使用Vuex时，`Vue.use(Vuex)`里便是调用了`install`方法。
```js
// ...
let Vue
// ...
// 初始install阶段，Vue.use(Vuex)会调用install方法
export function install (_Vue) {
  // Vue为store里定义，_Vue为调用install时传入的Vue
  // 防止重复install
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  // applyMixin函数作用：将store注入到子组件，子组件可通过this.$store访问store
  applyMixin(Vue)
}
```
store.js里导出了`install`方法。在store.js开头定义局部 Vue 变量，用于判断是否已经装载和减少全局作用域查找。
这里调用`applyMixin`方法，它将store注入到子组件，子组件可通过this.$store访问store
`// applyMixin.js`
```js
if (version >= 2) {
  Vue.mixin({ beforeCreate: vuexInit })
} 
```
applyMixin里对 vue 1.0 和 2.0 版本进行了判断，2.0下在`beforeCreate`阶段注入`store`
```js
// 子组件可以通过this.$store来访问store
function vuexInit () {
  const options = this.$options
  // 注入store
  // 初始时，在根组件上，调用者会传入store，所以会进入if逻辑
  if (options.store) {
    // options上的store可以为 function，
    // 这类似于 vue 里的 data return 的是个 function，防止多个 store下，里面的数据被共享
    this.$store = typeof options.store === 'function'
      ? options.store()
      : options.store
  } else if (options.parent && options.parent.$store) {
    // 在子组件上，初始化时未传入store，则从父组件中获取store
    // 公用了一份初始根组件时传入的全局的store
    this.$store = options.parent.$store
  }
}
```
### new Store实例化阶段
```js
  // plugins为外部传入的插件
  // strict为默认不开启严格模式（严格模式：只能在mutation里进行数据更改，在action等其他位置进行数据更改会抛出错误）
  const {
    plugins = [],
    strict = false
  } = options

  // 定义store 内部状态
  // 用于判断是否在commit环节的flag，保证只在mutation环境改变state
  this._committing = false
  // actions操作对象
  this._actions = Object.create(null)
  // 发布订阅模式下的订阅函数集合
  this._actionSubscribers = []
  // mutations操作对象
  this._mutations = Object.create(null)
  // 封装后的getters集合对象
  this._wrappedGetters = Object.create(null)
  /**
   * 格式化 options，也是该源码阅读的核心重点，
   * 在非模块模式（普通用法传入options）或 在按模块开发方式传入store时，存储处理过的modules
   * this._modules = {
   *   root: {
   *     context: {dispatch: ƒ, commit: ƒ},
   *     runtime: false,
   *     state: {…},
   *     _children: {},
   *     _rawModule: {state: {…}, actions: {…}, mutations: {…}, plugins: Array(1)},
   *     namespaced: false
   *   },
   *   __proto__: {
   *    get: ƒ (path)
   *    getNamespace: ƒ getNamespace(path)
   *    register: ƒ register(path, rawModule, runtime)
   *    unregister: ƒ unregister(path)
   *    update: ƒ update$1(rawRootModule)
   *    constructor: ƒ ModuleCollection(rawRootModule)
   *    __proto__: {...}
   *   }
   * }
   */
  this._modules = new ModuleCollection(options)
  // 模块命名空间map
  this._modulesNamespaceMap = Object.create(null)
  // 发布订阅模式下的订阅函数集合
  this._subscribers = []
  // vue实例，用到watch监视变化功能
  this._watcherVM = new Vue()
  // ...
  installModule(this, state, [], this._modules.root)

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state)

  // 调用传入的各种插件
  plugins.forEach(plugin => plugin(this))

  const useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools
  if (useDevtools) {
    devtoolPlugin(this)
  }
```
在 `constructor` 里主要操作为： 格式化modules，安装 module，初始化 store vm, 安装 plugins

### 格式化modules，即 `this._modules = new ModuleCollection(options)`
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。
每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  state: { ... },
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```
代码被分割到 `./module/module-collection` 文件夹下。
初始化时，执行 `register` 方法
```js
this.register([], rawRootModule, false)
```
register 接收3个参数
  * path：路径，模块tree的路径
  * rawModule：最初 `new Store` 时传入的 `options`
  * runtime：是否是运行时创建的模块,在初始化根模块时为 false， 其他情况为 true，理解为 初始化时的 flag

如初始化 register 时，参数为：`path: [], rawModule: options, runtime: false`
```js
register (path, rawModule, runtime = true) {// path: [], rawModule: options, runtime: false
  if (process.env.NODE_ENV !== 'production') {
    // 对构造器传入的options的getters、mutations、actions进行dev环境的格式校验
    // 非预期的格式会抛出错误
    assertRawModule(path, rawModule)
  }

  // 初始化module
  const newModule = new Module(rawModule, runtime)
  // 第一次初始化时，执行if代码块，path为[]
  if (path.length === 0) {
    this.root = newModule
  } else {
    // 获取当前module的parent
    const parent = this.get(path.slice(0, -1))
    // 添加child
    parent.addChild(path[path.length - 1], newModule)
  }

  // 递归注册嵌套的module
  if (rawModule.modules) {
    forEachValue(rawModule.modules, (rawChildModule, key) => {
      this.register(path.concat(key), rawChildModule, runtime)
    })
  }
}
```
register 里的逻辑大致为
 * 校验传入的options格式，非预期的格式会抛出错误
 * 实例化 `Module`，初始化时 模块 tree 的根即为 root，之后 addChild 添加的子模块 即会放入到 root._children 里，逐级对包含的所以模块进行递归 register，以形式 模块 tree

root格式如下：
```js
root: {
  context: {dispatch: ƒ, commit: ƒ},
  runtime: false,
  state: {…},
  _children: {},
  _rawModule: {state: {…}, actions: {…}, mutations: {…}, plugins: Array(1)},
  namespaced: false
}
```
#### 初始化module
```js
// 初始化module
const newModule = new Module(rawModule, runtime)
```
Module 定义在 `./module/module.js` 里

构造函数：
```js
constructor (rawModule, runtime) {// rawModule: options, runtime: false
  this.runtime = runtime
  // 存储module子项
  this._children = Object.create(null)
  // 存储初始化时传入的原始options
  this._rawModule = rawModule
  const rawState = rawModule.state

  // 兼容module形式里state传入函数形式，类似 组件中的 data，总是return 一个Object，来防止对象被共享
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
}
```
屡下 模块初始化 思路：
  * 对初始传入的 options 进行模块 实例化，
  * 里面包含了子模块的话 会被递归 放进 root._children 对象里，形成一颗 模块 tree，
  * 并且 通过 `forEachMutation` 包装函数等的类似方法，子模块在执行 action、mutation 方法时也只是执行的是子模块里对应的方法，
  * 每个模块的 _rawModule 即为 定义时 传入的 options
  * 每个模块的 state 即为 定义时 传入的 options.state

### 安装模块
```js
installModule(this, state, [], this._modules.root)
```
在模块被初始化定义后，通过 installModule 对 state, actions, mutations, getters 进行初始化处理。

```js
function installModule (store, rootState, path, module, hot) {
  // this, state(this._modules.root.state), [], this._modules.root
  // 是root时，path为[]
  const isRoot = !path.length
  //  modules: {
  //     a: moduleA,
  //     b: moduleB
  //   }
  // modules.a 的命名空间为 'a/'
  const namespace = store._modules.getNamespace(path)

  // 存储namespace对应的module于_modulesNamespaceMap
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module
  }

  // 设置 state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state)
    })
  }

  const local = module.context = makeLocalContext(store, namespace, path)

  // 拼接namespace，如：
  // modules: {
  //   account: {
  //     namespaced: true,
  //     state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
  //     getters: {
  //       isAdmin () { ... } // -> getters['account/isAdmin']
  //     },
  //     actions: {
  //       login () { ... } // -> dispatch('account/login')
  //     },
  //     mutations: {
  //       login () { ... } // -> commit('account/login')
  //     }
  //   }
  // }
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  // 递归install子项
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
```
#### 分析下 registerMutation 的注册
在这里先通过 forEachMutation 方法, 传入对应的模块的 mutation 和 key，
registerMutation 里将我们项目里定义的 mutations 方法以 key-value 形式存入 _mutations 里，在传入的时候 将 state 作为第一参数，我们自己传入的为第二参数形式，这里使得如文档里所说一样形式使用：
```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
> 这里会对命名空间进行处理，假如模块 A 中有名为 add 的 mutation 函数，那么在注册过程中会变成 a/add

相关 Mutation 注册代码：
->>>>>>>>>>>>
```js
module.forEachMutation((mutation, key) => {
  const namespacedType = namespace + key
  registerMutation(store, namespacedType, mutation, local)
})
//
forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn)
  }
}
//
function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload)
  })
}
```
<<<<<<<<<<

#### registerAction 的注册
```js
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload, cb) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}
```
这里将 `{ dispatch commit getters state rootGetters rootState }` 作为第一参数，将自己dispatch 时传入的参数作为第二参数，所以有了文档里所说的书写形式：
```js
// 自己项目里的 actions.js
toggleMenu ({ commit }) {
  commit('TOGGLE_MENU')
},
// or
setSidebarMenuList (context, userType) {
  context.commit('SET_SIDEBAR_MENU_LIST', userType)
}
```
> registerAction 里 处理了 promise 情况，所以 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise

所以我们可以这么来写：
```js
login({commit}, user){
  return new Promise((resolve, reject) => {
    commit('auth_request')
    axios({url: '...', data: user, method: 'POST' })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        reject(err)
      })
  })
}
```
```js
export default {
  methods: {
    register () {
      this.$store.dispatch('register', {
        name: this.name,
        password: this.password
      })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
```
将处理的请求提取到了vuex里，也使得页面里代码更加简洁了。只保留了业务逻辑。

#### registerGetter 的注册
```js
// ...
return rawGetter(
  local.state, // local state
  local.getters, // local getters
  store.state, // root state
  store.getters // root getters
)
```
getter 这里先处理了命名空间，然后这里接收 4 个参数。
前面两个为模块内的 local state ，local getters，后两个参数为根节点上的内容 root state，root getters。
当然，没使用模块形式的话，两者相同。

### resetStoreVM(this, state)
```js
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // ...
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  // ...
}
```
resetStoreVM 的工作是 实例化一个 vue 实例，并将 getters 里定义的方法 通过 Object.defineProperty 来进行绑定到 store.getters 上，
并作为 computed 计算属性，在state变化时，getter 能响应式变化。
在实际调用 即为如下关系：
```js
// 这里使得vm.$store.state 取到 vm._data.$$state
get state () {
  return this._vm._data.$$state
}
```
```js
store.state = store._vm._data.$$state
store.getters.a = store.a = store._vm._data.$$state.a
```
Vuex 还有一些map开头的辅助函数，这些 handler 通过 hook 达到了简写的目的。
Vuex 本身是 Vue 的插件形式，其自身继续延续支持插件形式。`replaceState`,`subscribe`通常会在插件里用到。
```js
store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})
```