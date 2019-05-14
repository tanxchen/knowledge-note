koa 功能
* 封装 http 模块【lib/application 下的 listen 方法】
* 构建中间件模型【通过 koa-compose 包】
* 整合了request,response,context【lib/application 下的 createContext 方法】
* 错误处理【lib/application 下的 onerror 方法】

一个基础模板代码如下：
```js
const Koa = require('koa');
const app = new Koa();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

koa 里，中间件函数接收两个参数 context, next，
通过 use 方法，将函数添加到 `middleware` 数组里【 `this.middleware.push(fn)` 】，
在 listen 里
```js
http.createServer(this.callback()).listen(...args);
```
调用了 `callback`，在 `callback` 里，通过 `compose(this.middleware)`，
处理之前添加过的中间件，返回 `this.handleRequest(ctx, fn)` 来执行中间件，
`handleRequest` 是返回 Promise 函数的，所以在编写中间件时，往往通过 async await 来构建，这里主要来解析下 `compose`，它是引用了 `koa-compose` 包，主要源码如下：
```js
function compose () {
  return function (context, next) {
    // last called middleware
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

compose 里会返回 dispatch 方法，dispatch 里会先执行第一个fn，并将 middleware 队列里下一个 fn 作为 next 参数，且 dispatch 返回的为 Promise，从而形成了先进后出洋葱式模型。
```sh
    +----------------------------------------------------------------------------------+
    |                                                                                  |
    |                              middleware 1                                        |
    |                                                                                  |
    |          +-----------------------------------------------------------+           |
    |          |                                                           |           |
    |          |                    middleware 2                           |           |
    |          |                                                           |           |
    |          |            +---------------------------------+            |           |
    |          |            |                                 |            |           |
    | action   |  action    |        middleware 3             |    action  |   action  |
    |  01      |   02       |                                 |     05     |    06     |
    |          |            |   action              action    |            |           |
    |          |            |    03                  04       |            |           |
    |          |            |                                 |            |           |
+-------------------------------------------------------------------------------------------------->
    |          |            |                                 |            |           |
    |          |            |                                 |            |           |
    |          |            +---------------------------------+            |           |
    |          +-----------------------------------------------------------+           |
    +----------------------------------------------------------------------------------+
```