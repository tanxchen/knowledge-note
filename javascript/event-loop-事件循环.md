event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop。

**宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用，这些异步任务包括：**
* setTimeout
* setInterval
* setImmediate (Node独有)
* requestAnimationFrame (浏览器独有)
* I/O
* UI rendering (浏览器独有)

**微队列，microtask，也叫jobs。 另一些异步任务的回调会依次进入micro task queue，等待后续被调用，这些异步任务包括：**
* process.nextTick (Node独有)
* Promise
* Object.observe(弃用)
* MutationObserver

（注：这里只针对浏览器和NodeJS）

**浏览器**
* 宏队列macrotask一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；
* 微任务队列中所有的任务都会被依次取出来执行，知道microtask queue为空；
* UI rendering是由浏览器自行判断决定的，但是只要执行UI rendering，它的节点是在执行完所有的microtask之后，下一个macrotask之前，紧跟着执行UI render。