* hash
  - hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
* chunkhash
  - chunkhash，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。
* contenthash
  - 在chunkhash的例子，我们可以看到由于index.css被index.js引用了，所以共用相同的chunkhash值。但是这样子有个问题，如果index.js更改了代码，css文件就算内容没有任何改变，由于是该模块发生了改变，导致css文件会重复构建。
  - 这个时候，我们可以使用extra-text-webpack-plugin里的contenthash值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建。

> webpack 4.0 之前使用 `extra-text-webpack-plugin`, webpack 4.0 后使用 `mini-css-extract-plugin`
```js
// extract css into its own file
new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css'))
```
```js
// vue-cli 3.0 里的配置
const filename = getAssetPath(
  options,
  `css/[name].[contenthash:8].css`,
  true /* placeAtRootIfRelative */
)
```