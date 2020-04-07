**Q:**
Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You may assume no duplicates in the array.

**Example 1:**
```
Input: [1,3,5,6], 5
Output: 2
```
**Example 2:**
```
Input: [1,3,5,6], 2
Output: 1
```
**Example 3:**
```
Input: [1,3,5,6], 7
Output: 4
```
**Example 4:**
```
Input: [1,3,5,6], 0
Output: 0
```

**A:**
```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  // for (let i = 0; i < nums.length; i++) {
  //   const element = nums[i];
  //   if (element === target || element > target) return i
  //   else if (i === nums.length - 1) return nums.length
  //   else if (element < target && nums[i + 1] > target) return i + 1
  // }

  // better use dichotomy
  let low = 0
  let high = nums.length - 1
  while (low <= high) {
    const middle = parseInt((low + high) / 2)
    const mVal = nums[middle]
    if (target > mVal) {
      low = middle + 1
    } else if (target < mVal) {
      high = middle - 1
    } else {
      return middle
    }
  }

  return low
};
```