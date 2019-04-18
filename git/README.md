```sh
#列出本地和远端分支
git branch -a
```

```sh
#【同步支线关系】更新分支关系，但不进行marge
git fetch
```

```sh
#设置分支源
git branch --set-upstream-to=origin/【远端分支】 【本地分支】
#例如
git branch --set-upstream-to=origin/20190412 20190412
```

```sh
#【更新本地代码】拉取远端代码并与本地代码合并
git pull
```

```sh
#【提交代码】将本地代码推送到远端
git push
#例如推送指定分支
git push origin 20180426
#或直接推送当前分支
git push
```

```sh
#查看本地与远程分支的追踪关系
git remote show origin
```

```sh
#查看可被清理的分支
git remote prune origin --dry-run
```

```sh
#清理该分支
git remote prune origin
```

```sh
#git 撤回提交远端的版本
#1. git log  查找commit的版本号

#2. git reset --hard <版本号>  ， 撤回到我们需要回退的版本

#3. git push origin master  --force   重新提交
```
