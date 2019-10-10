#include <iostream>
using namespace std;

int main(void)
{
  int *p = new int(1024);

  delete p;
  cout << "1st deleted p" << endl;
  delete p;
  cout << "2nd deleted p" << endl;
  p = NULL;
  cout << "p is assigned to NULL" << endl;
  delete p;
  cout << "3rd deleted p" << endl
       << endl;

  int *q = new int[1024];

  delete[] q;
  cout << "1st deleted q" << endl;
  delete[] q;
  cout << "2nd deleted q" << endl;
  q = NULL;
  cout << "q is assigned to NULL" << endl;
  delete[] q;
  cout << "3rd deleted q" << endl
       << endl;

  return 0;
}