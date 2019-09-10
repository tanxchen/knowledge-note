#include <iostream>

using namespace std;

class object {
  private:
    int val;
  public:
    object():val(0) {
      cout << "--** 【1】 **--" << endl;
    }
    object(int i):val(i) {
      cout << "--** 【2】 **-- " << val << endl;
    }
    ~object() {
      cout << "--** 【3】 **-- " << val << endl;
    }
};

class container {
  private:
    object one;
    // object two;
    int data;
  public:
    container():data(0) {
      cout << "--** 【4】 **--" << endl;
    }
    container(int i, int j, int k);
    ~container() {
      cout << "--** 【5】 **-- " << data << endl;
    }
};

container::container(int i, int j, int k):
// two(i),
one(j) {
  data = k;
  cout << "--** 【6】 **-- " << data << endl;
}

int main() {
  container obj;
  // cout << "------*********---------" << endl;
  // container anObj(5, 6, 10);
}

/*
 * 理解函数执行顺序
  --** 【1】 **--
  --** 【1】 **--
  --** 【4】 **--
  ------*********---------
  --** 【2】 **-- 6
  --** 【2】 **-- 5
  --** 【6】 **-- 10
  --** 【5】 **-- 10
  --** 【3】 **-- 5
  --** 【3】 **-- 6

  ------*********---------
  --** 【5】 **-- 0
  --** 【3】 **-- 0
  --** 【3】 **-- 0
*/