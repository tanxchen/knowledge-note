#### 一、强缓存：Expires， Cache-Control

##### 1、expires 
单位：毫秒，from memory cache(缓存于内存/硬盘)。
Expires = 时间，HTTP 1.0 版本，缓存的载止时间，允许客户端在这个时间之前不去检查（发请求)
缺点：客户端时间不准，则缓存不精确.
```js
// 20000 毫秒后过期
res.setHeader('Expires', new Date(Date.now() + 20000).toGMTString())
```

##### 2、cache-control
单位：秒，memory cache(缓存于内存/硬盘)。
max-age = 秒，HTTP 1.1版本，资源在本地缓存多少秒
优先级大于 `expires`，同时存在会覆盖 `expires`
|指令|参数|说明|
|:---|----|---|
|no-cache	|无	|强制向源服务器再次验证|
|no-store	|无	|不缓存请求或响应的任何内容|
```js
// 4 秒后过期
res.setHeader('Cache-Control', 'max-age=4')
```

#### 二、协商缓存：Last-Modified / if-Midified-Since 和 ETag / If-None-Match

##### 1、Last-Modified
单位：秒
缺点：
  * 1、若在 1 秒内的修改就不能被识别，意味着它只能作用于秒级的改变
  * 2、若文件在服务器生成的，则更新时间永远等于生成时间，起不到缓存作用

客户端第二次请求此 URL 时，根据 HTTP 协议的规定，浏览器会向服务器传送 If-Modified-Since 报头(HttpRequest Header)，用于 服务端对比时间判断 `stat.ctime.toGMTString`
```js
const IfModifiedSince = req.headers['if-modified-since']
if (IfModifiedSince) {
  if (IfModifiedSince === stat.ctime.toGMTString()) {
    res.statusCode = 304
    res.end()
  } else {
    send(req, res, file, stat)
  }
} else {
  send(req, res, file, stat)
}
```

##### 2、ETag 解决 Last-Modified 问题。与 [ If-None-Match ] 一组，是加强版的 `Last-Modified`

**生成方式：** 在 nginx 中 ETag 由 Last-Modified 和 Content-Length 组成
  * 1、保证内容不变，值不变。
  * 2、计算不会很耗 CPU。
  * 3、分布式系统里多台机器间文件上生成的值一致

**缺点：**
* 每次请求的时候，服务器都会把 index.html 读取一次，以确认文件有没有修改
* 对大文件进行etag 一般用文件的大小 + 文件的最后修改时间 来组合生成这个etag

Q：ETag 值改变了，是否意味着文件内容一定已经改了？

A：ETag 值的生成由 Last-Modified 和 Content-Length 组成，Last-Modified 又是由 文件的修改时间决定 [ stats.mtime ]，?:当编辑文件却未更改文件内容时，?:或者 touch file，mtime 也会改变.
```js
/* 一个文件 stats 对象：
Stats {
  dev: 16777221,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 49166203,
  size: 274,
  blocks: 8,
  atimeMs: 1585534449896.5554,
  mtimeMs: 1585534449874.3809,
  ctimeMs: 1585534449874.3809,
  birthtimeMs: 1585531375384.266,
  atime: 2020-03-30T02:14:09.897Z,
  mtime: 2020-03-30T02:14:09.874Z,
  ctime: 2020-03-30T02:14:09.874Z,
  birthtime: 2020-03-30T01:22:55.384Z
}
*/
```

#### 强缓存 vs 协商缓存
* 状态：200（from memory cache）为强缓存
* 状态：304 为协商缓存
* 状态：200 不缓存

**具体逻辑流程：**
![catch](https://gitee.com/ryanxchen/img/raw/master/blog/cache.jpeg)
