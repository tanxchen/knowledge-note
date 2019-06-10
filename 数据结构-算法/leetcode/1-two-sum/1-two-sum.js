// nums = [2, 7, 11, 15], target = 9,
// nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1]

// O(1)
const twoSum = function (nums, target) {
  let obj = {}
  let c = undefined
  for (let i = 0; i < nums.length; i++) {
    c = target - nums[i]
    if (c in obj) {
      return [obj[c], i]
    }
    obj[nums[i]] = i
  }
}

const [nums, target] = [[2, 5, 3, 5, 11, 15], 10]

console.log(twoSum(nums, target))