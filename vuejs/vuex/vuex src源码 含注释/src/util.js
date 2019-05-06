export function find (list, f) {
  return list.filter(f)[0]
}

// 深拷贝
export function deepCopy (obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // 设置缓存
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

// 多次用到的方法
// 将传入的对象，取出val,key为参数传入进fun里
export function forEachValue (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise (val) {
  return val && typeof val.then === 'function'
}

// 断言的方法，false时会抛出错误
export function assert (condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}
