function INIT () {
  var init = 7.5 // 设计图宽的100%
  var num = 0
  var mql = window.matchMedia('(orientation: portrait)')
  if (mql.matches) {
    num = document.documentElement.clientWidth // 竖屏
  } else {
    num = document.documentElement.clientHeight // 横屏
  }
  if (num > 750) num = 750 // 定义最大值
  document.documentElement.style.fontSize = num / init + 'px'
}
INIT()
window.addEventListener(
  'onorientationchange' in window ? 'orientationchange' : 'resize',
  function () {
    INIT()
  },
  false
)

// window.addEventListener("DOMContentLoaded",
//   function () { 
//     function e() { 
//       var e = window.location.href,
//       n = document.documentElement.clientWidth < 1e3,
//       t = ["mobile","pc"]; 
//       -1 < e.indexOf(t[~~n]) && (
//         window.location = e.replace(t[~~n],t[~~!n])
//       ) 
//     } 
//     window.addEventListener("resize",e),
//     e() 
//   }
// );
