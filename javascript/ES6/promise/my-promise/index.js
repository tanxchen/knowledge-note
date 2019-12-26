const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  state = PENDING
  value = null
  reason = null
  resolveList = []
  rejectList = []

  constructor (exe) {
    try {
      exe(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (value) {
    this.state = FULFILLED
    this.value = value
    this.resolveList.forEach(resolve => {
      resolve(value)
    })
  }

  reject (reason) {
    this.state = REJECTED
    this.reason = reason
    this.rejectList.forEach(reject => {
      reject(reason)
    })
  }

  then (resolve, reject) {
    return new MyPromise((resolve, reject) => {
      if (this.state === PENDING) {
        resolve && this.resolveList.push(resolve)
        reject && this.rejectList.push(reject)
      }
      else if (this.state === FULFILLED) {
        resolve && resolve(this.value)
      }
      else if (this.state === REJECTED) {
        reject && reject(this.reason)
      }
    })
  }
}

const po1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(1)
    resolve(1)
  }, 3000)
})

po1.then(res => {
  console.log(2)
  console.log(res)
})