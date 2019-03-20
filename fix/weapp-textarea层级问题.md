微信小程序里textarea是原生组件，所以会是最高层级，z-index等均无效。
解题思路：在弹层显示时，将textarea进行隐藏，并用view来代替伪装textarea占位
相关代码：
```html
<textarea
  placeholder="点击输入备注信息"
  maxlength="-1"
  auto-height
  class="message-input"
  value="{{ textarea }}"
  data-key="textarea"
  bindinput="textareaInput"
  hidden="{{ isHiddenTextarea }}"
></textarea>
<!-- fix: textarea z-index level -->
<view class="message-input" style="color:#999;" wx:if="{{ isHiddenTextarea && textarea === '' }}">点击输入备注信息</view>
<!-- fix: textarea z-index level -->
<view class="message-input" wx:if="{{ isHiddenTextarea && textarea !== '' }}">{{ textarea }}</view>
```

```css
.message-input {
  background-color: #fff;
  width: 100%;
  padding: 10px;
  min-height: 70px;
  box-sizing: border-box;
}
```

```js
// 通过修改isHiddenTextarea变量控制textarea显示与否
data: {
  isHiddenTextarea: false
}
```