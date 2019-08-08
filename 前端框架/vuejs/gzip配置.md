```js
const CompressionPlugin = require('compression-webpack-plugin')

chainWebpack: config => {
  if (process.env.NODE_ENV === 'production') {
    // #region 启用GZip压缩
    config
      .plugin('compression')
      .use(CompressionPlugin, {
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8,
        cache: true
      })
      .tap(args => { })
    // #endregion
  }
}
```