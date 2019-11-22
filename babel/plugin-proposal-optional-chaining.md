使用 plugin-proposal-optional-chaining 包解决空对象的属性调用问题

安装
```sh
npm install -D @babel/plugin-proposal-optional-chaining
# or
yarn add @babel/plugin-proposal-optional-chaining --dev
```

配置 `.babelrc`
```js
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}
```

[babel官网文档说明](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)

> vscode 报错解决方案？