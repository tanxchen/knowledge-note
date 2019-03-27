async function async1() {
  console.log("async1 start-*02");
  await async2();
  console.log("async1 end-*微2");
}
async function async2() {
  console.log('async2-*03');
}
console.log("script start-*01");
setTimeout(function () {
  console.log("settimeout-*宏1");
});
async1()
new Promise(function (resolve) {
  console.log("promise1-*04");
  resolve();
}).then(function () {
  console.log("promise2-*微3");
});
setImmediate(() => {
  console.log("setImmediate-*宏2")
})
process.nextTick(() => {
  console.log("process-*微1")
})
console.log('script end-*05'); 