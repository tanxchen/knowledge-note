14. Longest Common Prefix

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

**Example 1:**
```
Input: ["flower","flow","flight"]
Output: "fl"
```
**Example 2:**
```
Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```
**Note:**
All given inputs are in lowercase letters a-z.

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if(strs.length === 0) {
    return '';
  }
  
  let str = strs[0];
  
  for (const word of strs) {
    while (word.indexOf(str) !== 0) {
      str = str.substring(0, str.length - 1);
      if (str === '')
        break;
    }
  }
  return str;
};
```