```js
const c = require('vue-template-compiler')
const x = c.compile('<input v-model="aa" />')
console.log(x);
```