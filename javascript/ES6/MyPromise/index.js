const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  status = PENDING
  value = undefined
  reason = undefined
  // resolve方法setTimeout下，比then先执行，then里还是PENDING状态情况，需缓存回调fun，再执行回调fun
  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  constructor(excutor) {
    if (typeof excutor !== 'function') {
      throw new Error('Mypromise must accept a function as a parameter!')
    }

    try {
      excutor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (val) {
    if (this.status !== PENDING) return

    this.status = FULFILLED
    this.value = val

    this.onFulfilledCallbacks.forEach(fun => fun())
  }

  reject (val) {
    if (this.status !== PENDING) return

    this.status = REJECTED
    this.reason = val

    this.onRejectedCallbacks.forEach(fun => fun())
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const _this = this
  const promise2 = null

  promise2 = new MyPromise((resolve, reject) => {
    if (_this.status === FULFILLED) {
      try {
        const x = onFulfilled(_this.value)
        _this.resolvePromise(promise2, x, resolve, reject)
      } catch (reason) {
        reject(reason)
      }

    } else if (_this.status === REJECTED) {
      try {
        const x = onRejected(_this.reason)
        _this.resolvePromise(promise2, x, resolve, reject)
      } catch (reason) {
        reject(reason)
      }

    } else if (_this.status === PENDING) {
      _this.onFulfilledCallbacks.push(() => {
        try {
          const x = onFulfilled(_this.value)
          _this.resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
      _this.onRejectedCallbacks.push(() => {
        try {
          const x = onRejected(_this.reason)
          _this.resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    }
  })

  return promise2
}

MyPromise.prototype.resolvePromise = function (promise2, x, resolve, reject) {


}

module.exports = MyPromise
