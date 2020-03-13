// simpleKoaCompose
const [fn1, fn2, fn3] = this.middleware;
const fnMiddleware = function(context){
  return Promise.resolve(
    fn1(context, function next(){
      return Promise.resolve(
        fn2(context, function next(){
          return Promise.resolve(
            fn3(context, function next(){
              return Promise.resolve();
            })
          )
        })
      )
    })
  );
};
fnMiddleware(ctx).then(handleResponse).catch(onerror);
