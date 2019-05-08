WrappedComponent 为普通定义的组件，通过 components 作为子组件，形成高阶组件。
在高阶组件组件里干点别的事情。
```js
import WrappedComponent from './wrapped.vue';

function WithConsole(WrappedComponent) {
  return {
    mounted() {
      console.log("I have already mounted");
    },
    props: WrappedComponent.props,
    render(h) {
      return h(WrappedComponent, {
        props: this.$props,
        attrs: this.$attrs,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots
      });
    }
  };
}
```
[参考文章 link ](http://hcysun.me/2018/01/05/%E6%8E%A2%E7%B4%A2Vue%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6/)

[参考上面文章评论代码 link ](https://codesandbox.io/s/712pmvqy66)