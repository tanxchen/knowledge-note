#### Vue.$set 实现原理：
* 如果目标是数组,使用 vue 实现的变异方法 splice 实现响应式
* 如果目标是对象,判断属性存在,即为响应式,直接赋值
* 如果 target 本身就不是响应式,直接赋值
* 如果属性不是响应式,则调用 defineReactive 方法进行响应式处理
```js
function set (target /** Array<any> | Object */, key: any, val: any): any {
  // if (process.env.NODE_ENV !== 'production' &&
  //   (isUndef(target) || isPrimitive(target))
  // ) {
  //   warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  // }

  /**
   * 数组情况
   */
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度，避免索引数组长度导致 splice() 执行有误
    target.length = Math.max(target.length, key)
    // 调用已经被重写的 splice 方法触发响应式
    target.splice(key, 1, val)
    return val
  }
  /**
   * target 为对象, key 在 target 或者 target.prototype 上 
   * 且必须不能在 Object.prototype 上,直接赋值
   */
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 以上都不成立, 即开始给 target 创建一个全新的属性
  // 获取 Observer 实例
  const ob = (target /** any */).__ob__
  // if (target._isVue || (ob && ob.vmCount)) {
  //   process.env.NODE_ENV !== 'production' && warn(
  //     'Avoid adding reactive properties to a Vue instance or its root $data ' +
  //     'at runtime - declare it upfront in the data option.'
  //   )
  //   return val
  // }
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 进行响应式处理
  defineReactive(ob.value, key, val)
  // 手动触发更新
  ob.dep.notify()
  return val
}
```