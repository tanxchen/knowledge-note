> 提到抽象语法树 AST 概念
### loader 编写
loader 包文件需要导出一个函数，函数接收 source。
比如实现一个转译 markdown 内容的 loader 用于vue项目，如下：
```js
module.exports = function (content) {
  const markdown = require('../markdown')({})
  const html = markdown.render(content)
  return (
    `<template>\n` +
    `<div class="content">${html}</div>\n` +
    `</template>`
  )
}
```
其是 loader 就是对拿到的 source 进行一个转译加工，然后继续输出 加工后的 source。

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
