#include <iostream>

using namespace std;

class Test
{
  public:
    Test();
    static void print()
    {
      std::cout << "Test" << endl; //命名空间时使用::
    }

  private:
    int a;
};

Test::Test() : a(1) //定义时使用::
{
}

int main()
{
  cout << "test" << endl;
}
// Test::get(); //使用静态成员函数时用::
