#include <stdio.h>

int main()
{
  int scores[3] = {1, 2, 3};
  printf("Hello, World! \n");
  printf("%d\n", scores[1]);

  return 0;
}

/*
  编译： gcc hello.c
  执行：./a.out
  不指定编译输出的文件名，则默认输出名为 a.out 可通过 -o 来指定输出的文件名。
  如：gcc hello.c -o hello
  执行 ./hello
  */