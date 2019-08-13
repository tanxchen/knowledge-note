#include <stdio.h>
#include <string.h>

void arrFun() {
  // 初始化一个数组
  int array[6] = {2, 7, 3, 1, 9, 3};
  // 求数组长度length 公式：【 sizeof(数组名)/sizeof(数组类型) 】
  printf("%lu\n", sizeof(array)/sizeof(int));

  // char string[10] = {'a', 'b'}; // or char string[10] = 'ab'
  char string[10] = "ab";
  int length = strlen(string);
  printf("length = %d\n", length); // 输出3

  char string1[10] = "abc";
  char string2[] = "def";
  strcat(string1, string2);
  puts(string1); // 输出 abcdef
  printf("%s\n", string1);
}

int main() {
  arrFun();
}

/**
 * 引入相关库 #include <string.h>
 * strlen：求字符串长度
 * strcat：把string2中的字符串连接到string1 中字符串的后面，并删去string1后的串标志“\0”。本函数返回值是string1的首地址
 */
