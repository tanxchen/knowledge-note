```html
<div id="backtop" class="backtop-wrap">
  <canvas id="cvs" width="38px;" height="38px;"></canvas>
</div>
```

```css
.backtop-wrap {
  position: fixed;
  background-color: rgb(158, 158, 158);
  border-radius: 30px;
  bottom: 20px;
  right: 20px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  z-index: 11;
}
```

```js
//返回顶部JS
window.onload = function () {
  function checkPosition(pos) {
    $(window).scrollTop() > pos ? $('#backtop').fadeIn() : $('#backtop').fadeOut();
  }

  $(window).on('scroll',function () {
    checkPosition(parseInt($(window).height() / 5));
  });

  checkPosition(parseInt($(window).height() / 5));
  //使用canvas，渲染返回顶部样式
  var canvas = document.getElementById('cvs');
  var cxt = canvas.getContext('2d');
  cxt.beginPath();
  cxt.lineCap = 'round';
  cxt.moveTo(13,22);
  cxt.lineTo(19,14);
  cxt.lineTo(25,22);
  cxt.strokeStyle = "#FBFBFB";
  cxt.lineWidth = 3;
  cxt.stroke();

  $("#cvs").click(function () {
    if ($(window).scrollTop() && !$('html,body').is(':animated')) {
      $('html,body').animate({
        scrollTop: 0
      },400);
    }
  });
}
```