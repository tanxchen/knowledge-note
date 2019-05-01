### 1、起步
[git安装参考link](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)
初次安装完成，先进行全局配置
```sh
# 设置 git用户 邮箱
git config --global user.name "Ryanx Chen"
git config --global user.email jsryanx@gmail.com
# 检查配置信息
git config --list
```
### 2、基础
初始化git `git init`
克隆项目 `git clone [url]` or 克隆并重命名项目 `git clone [url] [new project name]`
指定文件跟踪 `git add README.md`
提交 `git commit -m 'init'`
检查当前文件状态 `git status`
