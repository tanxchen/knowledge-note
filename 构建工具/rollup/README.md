[docs](https://rollupjs.org)

* Rollup 默认采用ES模块标准
* Rollup 只处理文件里引用的相关代码，无关代码会被删除
* Rollup 自身只处理模块转换（ES6 模块 -> CommonJS/UMD 模块）
* 额外功能可通过引入插件来处理

**常见插件 list**
```js
// ？
import babel from 'rollup-plugin-babel';
// ES6 转 ES5, 但不能处理 for in 等方法。。
// 详情见文档：https://buble.surge.sh/guide/#unsupported-features
import buble from 'rollup-plugin-buble';
// 别名插件
import alias from 'rollup-plugin-alias';
// 能处理导入已存在的 CommonJS 模块
import commonjs from 'rollup-plugin-commonjs';
// 能处理导入从 JSON 文件中读取数据
import json from 'rollup-plugin-json';
// 能处理导入 node_modules 中的依赖
import resolve from 'rollup-plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';
// 能处理 入口为 TS 类型文件
import typescript from 'rollup-plugin-typescript';
```

[更多插件](https://github.com/rollup)