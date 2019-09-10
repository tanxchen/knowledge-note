#if !defined(EQUATION_H)
#define EQUATION_H
#include <iostream>
#include <cmath>

using namespace std;

class FindRoot
{
  private:
    float a, b, c, d;
    double x1, x2;
  public:
    FindRoot(float x, float y, float z);
    void Find();
    void Display();
};

#endif