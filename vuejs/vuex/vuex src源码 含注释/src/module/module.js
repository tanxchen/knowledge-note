import { forEachValue } from '../util'

// store模块的基本数据结构，带有一些属性和方法
export default class Module {
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

  // 只有module形式下才可能会传入namespaced选项
  get namespaced () {
    return !!this._rawModule.namespaced
  }

  addChild (key, module) {
    this._children[key] = module
  }

  removeChild (key) {
    delete this._children[key]
  }

  getChild (key) {
    return this._children[key]
  }

  update (rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  forEachChild (fn) {
    forEachValue(this._children, fn)
  }

  forEachGetter (fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  forEachMutation (fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
