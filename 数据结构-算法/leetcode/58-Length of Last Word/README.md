Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word (last word means the last appearing word if we loop from left to right) in the string.

If the last word does not exist, return 0.

Note: A word is defined as a maximal substring consisting of non-space characters only.

Example:
```
Input: "Hello World"
Output: 5
```


```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  const arr = s.replace(/(\s){1,}/g, ' ').split(' ')
  const last = arr[arr.length - 1]
  const pre = arr[arr.length - 2] || ''
  return last === '' ? pre.length : last.length
};
```