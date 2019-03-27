// https://blog.liuxuan.site/2018/09/28/javascript_promise/
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function MyPromise(excutor) {
  if (typeof excutor !== 'function') {
    throw new Error('Mypromise must accept a function as a parameter!')
  }

  let _this = this
  _this.status = PENDING
  _this.value = undefined
  _this.reason = undefined
  // resolve方法setTimeout下，比then先执行，then里还是PENDING状态情况，需缓存回调fun，再执行回调fun
  _this.onFulfilledCallbacks = []
  _this.onRejectedCallbacks = []

  function resolve(value) {
    if (_this.status !== PENDING) return

    _this.status = FULFILLED
    _this.value = value

    _this.onFulfilledCallbacks.forEach(fun => fun())
  }

  function reject(reason) {
    if (_this.status !== PENDING) return

    _this.status = REJECTED
    _this.reason = reason

    _this.onRejectedCallbacks.forEach(fun => fun())
  }

  try {
    excutor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => { return value }
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  const _this = this
  let promise2 = null

  promise2 = new MyPromise((resolve, reject) => {
    if (_this.status === FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfilled(_this.value)
          _this.resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })

    } else if (_this.status === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(_this.reason)
          _this.resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })

    } else if (_this.status === PENDING) {
      _this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(_this.value)
            _this.resolvePromise(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })
      })
      _this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(_this.reason)
            _this.resolvePromise(promise2, x, resolve, reject)
          } catch (reason) {
            reject(reason)
          }
        })
      })
    }
  })

  return promise2
}

MyPromise.prototype.resolvePromise = function(promise2, x, resolve, reject) {
  const _this = this
  let called = false

  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }

  if (x !== null && (
      Object.prototype.toString.call(x) === '[object Object]' ||
      Object.prototype.toString.call(x) === '[object Function]')
  ) {
    try {
      let then = x.then

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          _this.resolvePromise(promise2, y, resolve, onRejected)
        }, reason => {
          if (called) return
          called = true
          reject(reason)
        })
      } else {
        if (called) return
        called = true
        resolve(x)
      }
    } catch (reason) {
      if (called) return
      called = true
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

MyPromise.prototype.finally = function(fn) {
  return this.then(value => {
    fn()
    return value
  }, reason => {
    fn()
    throw reason
  })
}

MyPromise.prototype.done = function() {
  this.catch(reason => {
    throw reason
  })
}

MyPromise.all = function(promiseArr) {
  return new MyPromise((resolve, reject) => {
    let result = []

    promiseArr.forEach((promise, index) => {
      promise.then(value => {
        result[index] = value

        if (result.length === promiseArr.length) {
          resolve(result)
        }
      }, reject)
    })
  })
}

MyPromise.race = function(promiseArr) {
  return new MyPromise((resolve, reject) => {
    promiseArr.forEach(promise => {
      promise.then(value => {
        resolve(value)
      }, reject)
    })
  })
}

MyPromise.resolve = function(value) {
  let promise
  promise = new MyPromise((resolve, reject) => {
    this.prototype.resolvePromise(promise, value, resolve, reject)
  })
  return promise
}

MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}

module.exports = MyPromise
