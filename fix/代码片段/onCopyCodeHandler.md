```js
const onCopyCodeHandler = () => {
  // `navigator.clipboard.writeText` not working in wechat browser.
  if(navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1){
    navigator.clipboard.writeText(state.code).then(() => confirm())
  }else{
      const input = document.createElement("input");
      input.value = state.code;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      confirm();
  }
}
```
