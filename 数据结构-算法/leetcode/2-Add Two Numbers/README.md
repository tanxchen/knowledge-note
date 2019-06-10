A：You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example:**
```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
```
Q：
```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  var head = new ListNode(0); // 设置头结点
  var pos = head; // 当前指向指针
  var temp = 0; // 缓存十位数结果，超出10，为 1，否则为 0

  while(l1 !== null || l2 !== null || temp > 0){
    pos.next = new ListNode(0); // 申请新结点
    pos = pos.next; // 把当前指针指向新节点

    if (l1 !== null) {
      temp += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      temp += l2.val;
      l2 = l2.next;
    }

    pos.val = temp % 10;
    temp = parseInt(temp / 10);
  }

  return head.next; // 返回头结点指向的第一个结点
};
```
