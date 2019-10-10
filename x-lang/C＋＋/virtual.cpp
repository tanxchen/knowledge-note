#include <iostream>
using namespace std;

class VV {
  public:
    virtual int c() {
      cout << "aaa" << endl;
      return 0;
    }
};

int main() {
  VV *v;
  // VV f = &VV;/
  v->c();
  return 0;
}
