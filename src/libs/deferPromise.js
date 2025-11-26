export default function deferPromise(){
  let _resolve,_reject;
  let promise = new Promise((resolve,reject) => {
    _resolve = resolve;
    _reject = reject;
  });
  let subs = [];
  let subscribe = (callback) => {
    subs.push(callback);
    return {
      unsubscribe : function() {
        let index = subs.indexOf(callback);
        if(index > -1){
          subs.splice(index,1);
        }
      }
    }
  }
  let _next = (res) => {
    subs.forEach(callback => {
      callback(res)
    });
  }
  return {
    resolve : function(res) {
      _resolve(res);
    },
    reject : function(res) {
      _reject(res);
    },
    next : function(res) {
      _next(res);
    },
    then : (callback) => {
      return promise.then(callback);
    },
    catch : (callback) => {
      return promise.catch(callback);
    },
    promise,
    subscribe
  }
}
