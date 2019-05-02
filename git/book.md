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
##### 跟踪新文件
指定文件跟踪 `git add README.md`
所有文件跟踪 `git add .`

##### 暂存已修改文件
提交 `git commit -m 'init'`
> `git commit -a -m 'added new'` -a 可以跳过 add 阶段，直接提交所以跟踪的文件
##### 检查当前文件状态
检查当前文件状态 `git status`
##### 状态简览
`git status -s`
##### 查看已暂存和未暂存的修改
查看已暂存的将要添加到下次提交里的内容 `git diff --staged`
##### 忽略文件
创建一个名为 .gitignore 的文件，列出要忽略的文件模式
```sh
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*

```
##### 移除文件
`git rm README`
`git rm --cached README` 文件保留在磁盘，git 不继续跟踪
`git rm log/\*.log` 删除 log/ 目录下扩展名为 .log 的所有文件
##### 移动文件
重命名文件 `git mv file_from file_to`
> 其实，运行 git mv 就相当于运行了下面三条命令：
mv README.md README
git rm README.md
git add README

##### 查看提交历史
`git log`
一个常用的选项是 -p，用来显示每次提交的内容差异。 你也可以加上 -2 来仅显示最近两次提交 `git log -p -2`
查看每次提交的简略的统计信息，你可以使用 --stat 选项：`git log --stat`
`git log --pretty=oneline` oneline 与之选项还有 short，full 和 fuller，**format**
`git log --pretty=format:"%h - %an, %ar : %s"`

选项|	说明|
:--|---
%H |提交对象（commit）的完整哈希字串
%h |提交对象的简短哈希字串
%T |树对象（tree）的完整哈希字串
%t |树对象的简短哈希字串
%P |父对象（parent）的完整哈希字串
%p |父对象的简短哈希字串
%an |作者（author）的名字
%ae |作者的电子邮件地址
%ad |作者修订日期（可以用 --date= 选项定制格式）
%ar |作者修订日期，按多久以前的方式显示
%cn |提交者（committer）的名字
%ce |提交者的电子邮件地址
%cd |提交日期
%cr |提交日期，按多久以前的方式显示
%s |提交说明

`git log --pretty=format:"%h %s" --graph`
