##### 发包白名单 files 属性:
将项目要发布的文件或文件夹添加到`package.json`里的`files`属性下，如：
```json
"files": [
  "dist",
  "typings/**/*.d.ts"
]
```
仅仅会发布 `dist` 和 `typings` 目录。
##### 发包 黑名单 `.npmignore` 文件，会将类似 `.gitignore` 忽略设置的文件。
两者可结合使用。

---
#### npm publish 包

[npm publish 包](https://www.jianshu.com/p/f5d4c891830f)

---
#### npm unpulish 包
首先 npmjs.org 不支持删除发布时间超过二十四小时的包。

发布时间二十四小时内的包
npm unpublish 包名即可。
发布时间超过二十四小时内的包
发布一个新版本。里面是空文件，覆盖以前的包。
然后执行npm deprecate my-thing@"< 最新版本号"
