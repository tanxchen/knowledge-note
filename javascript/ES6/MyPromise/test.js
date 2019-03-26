const MyPromise = require('./index')

const p = new MyPromise((resolve, reject) => {
  setTimeout(function () {
    resolve(123);
  }, 1000)
})

p.then(
  value => console.log('value1', value),
  reason => console.log('reason1', reason)
)

p.then(
  value => console.log('value2', value),
  reason => console.log('reason2', reason)
)
