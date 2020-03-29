**Q:**
Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1.Open brackets must be closed by the same type of brackets.
2.Open brackets must be closed in the correct order.

Note that an empty string is also considered valid.

**Example 1:**
```
Input: "()"
Output: true
```
**Example 2:**
```
Input: "()[]{}"
Output: true
```
**Example 3:**
```
Input: "(]"
Output: false
```
**Example 4:**
```
Input: "([)]"
Output: false
```
**Example 5:**
```
Input: "{[]}"
Output: true
```

**A:**
```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const ss = s.split('')

  if(ss.length === 0) return true
  if(ss.length && ss.length % 2 !== 0) return false

  const hash = {
    ')': '(',
    '}': '{',
    ']': '['
  }

  let p = ss.pop()

  if (!hash[p]) return false

  const _ = [p]

  while (ss.length) {
    p = ss.pop()
    if (hash[p]) {
      _.push(p)
    } else if (p === hash[_.pop()]) {
      continue
    } else return false
  }

  return !_.length
};
```