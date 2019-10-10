struct Seqlist
{
  int key;
  /* data */
};


void InsertSort(Seqlist R, int n)
{
  //对顺序表R做直接插入排序
  // (46，39，17，23，28，55，18，46)
  int i, j;
  for (i = 2; i <= n; i++)
  {
    //若R[i].key< R[i]，移动
    if (R[i].key < R[i-1].key) {
      R[0] = R[i]; //当前记录复制为哨兵
      for(j = i - 1; R[0].Key < R[j].key; j--)//找插入位置
      {
        R[j+1]=R[j]; //记录后移
      }
      R[j+1]=R[0]; //R[i]插入到正确位置
    }
  }
}
