```js
uploadImgFile (params = {}) {
  return new Promise((resolve,reject) => {
    wx.chooseImage({
      count: 1,
      success (res) {
        const fileName = new Date().getTime()
        const imgsrc = res.tempFilePaths[0];
        const index = imgsrc.lastIndexOf("\.");
        const imgExtension = imgsrc.substring(index + 1,imgsrc.length);
        const imgPath = fileName + '.' + imgExtension;
        const url = params.dir + `${$.getYYMMDD()}/` + imgPath
        wx.uploadFile({
          url: params.host, //上传地址,
          filePath: imgsrc,
          name: 'file',
          formData: {
            key: url, // 文件上传的位置(默认根目录)+文件名字 默认："$(filename)"
            policy: params.policy,
            OSSAccessKeyId: params.accessId,
            success_action_status: '200', // 让服务端返回200,不然，默认会返回204
            signature: params.signature,
          },
          success: function (res) {
            resolve({ url: url, src: imgsrc });
          },
          fail: function (res) {
            reject(res);
          }
        })
      },
    })
  })
}
```