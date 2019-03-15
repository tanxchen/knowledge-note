环境：app内嵌h5页面开发

问题：通过document.title方式二次修改标题不成功，只有首次能成功渲染显示，二次时候，document.title值已改变，但未渲染成功

fix：通过与ios、安卓同学的协调，调用原生修改页面title的方法