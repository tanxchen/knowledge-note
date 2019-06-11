export default function (Vue) {
  // 获取Vue版本，区分1.0和2.0
  const version = Number(Vue.version.split('.')[0])
  // 通过mixin，在beforeCreate钩子中将store注入到子组件中
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // 兼容vue1.0版本
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  // 子组件可以通过this.$store来访问store
  function vuexInit () {
    const options = this.$options
    // 注入store
    // 初始时，在根组件上，调用者会传入store，所以会进入if逻辑
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      // 在子组件上，初始化时未传入store，则从父组件中获取store
      // 公用了一份初始根组件时传入的全局的store
      this.$store = options.parent.$store
    }
  }
}
