#include <iostream>
using namespace std;

int main ()
{
  char c = 'c';
  int a = 4;
  float f = 3;
  double d = 1.212;

  // cout << typeid(c + a / d + f).name() << endl;
  // cout << typeid(a).name() << endl;
  // cout << typeid(c).name() << endl;
  // cout << typeid(f).name() << endl;
  // cout << typeid(d).name() << endl;
  cout << ("%s\n", &c);
  return 0;
}