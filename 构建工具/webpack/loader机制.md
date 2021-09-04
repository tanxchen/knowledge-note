> 提到抽象语法树 AST 概念
### loader 编写
loader 包文件需要导出一个函数【可为异步函数】，函数接收唯一参数 source【是一个包含源文件内容的字符串】。
比如实现一个转译 markdown 内容的 loader 用于vue项目，如下：
```js
module.exports = function (content) {
  const markdown = require('markdown-it')({})
  const html = markdown.render(content)
  return (
    `<template>\n` +
    `<div class="content">${html}</div>\n` +
    `</template>`
  )
}
```
其是 loader 就是对拿到的 source 进行一个转译加工，然后继续输出 加工后的 source（如css-loader），异或没有输出结束流程。

### loader 用法

比如在 vue.config.js 里使用：
```js
chainWebpack: config => {
  config.module
    .rule('markdown')
    .test(/\.md$/)
    .use('vue-loader')
    .loader('vue-loader')
    .options({
      compilerOptions: {
        preserveWhitespace: false
      }
    })
    .end()
    .use('markdown-loader')
    .loader(require.resolve('./markdownLoader'))
    // .options({ markdown })
}
```

### loader 执行规则

loader 常规从右往左执行，从下往上执行。
右往左类似于函数式`compose`写法，而非`pipe`式写法。
```js
compose : require("style-loader!css-loader!sass-loader!./my-styles.sass");

pipe : require("./my-styles.sass!sass-loader!css-loader!style-loader");
```
下往上执行顺序可通过 enforce 属性改变权重。
如：
```js
 module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      ...otherloader
    ]
 }
```
通过 `enforce: 'pre'` 属性，将 `eslint-loader` 提升到首位顺序执行。
具体看[官方文档](https://webpack.docschina.org/configuration/module/#ruleenforce)

### loader 进阶学习

[掘金_进阶_loader十问](https://juejin.cn/post/6844903693070909447)
#### [Pitching Loader](https://webpack.docschina.org/api/loaders/#pitching-loader)
loader 总是 从右到左被调用。有些情况下，loader 只关心 request 后面的 元数据(metadata)，并且忽略前一个 loader 的结果。在实际（从右到左）执行 loader 之前，会先 从左到右 调用 loader 上的 pitch 方法。
