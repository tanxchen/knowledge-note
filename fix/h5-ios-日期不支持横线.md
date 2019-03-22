ios里日期BUG:
```js
new Date('2019-03-22') // 报错
```
fix：
```js
let str = '2019-03-22'
if (typeof str === 'string) {
  str = str.replace(/-/g, '/')
}
new Date(str)
```