const NOOP = function(){}
export default class EventEmitter{
  constructor(options = {}){
    this.cbs = {}
    this.delays = {};
    if(options.onNeeds){
      this.onNeeds(options.onNeeds);
    }
  }
  on(evtName,callback){
    if(!this.cbs[evtName]){
      this.cbs[evtName] = []
    }
    this.cbs[evtName].push(callback);
    return () => {
      this.off(evtName,callback);
    }
  }
  emit(evtName,data){
    let cbs = this.cbs[evtName] || [];
    cbs.forEach(cb => {
      cb(data);
    });
  }
  delayEmit(evtName,data){
    let cbs = this.cbs[evtName] || [];
    if(cbs.length == 0){
      let delays = this.delays[evtName] = this.delays[evtName] || [];
      delays.push(cb => {
        cb(data);
      })
    }else{
      this.emit(evtName,data);
    }
  }
  delayOn(evtName,cb,count = -1){
    //先清空缓存任务
    this.runRelay(evtName,cb,count);
    //再绑定新任务
    return this.on(evtName,cb);

  }
  runRelay(evtName,cb,count = -1){
    let delays = this.delays[evtName] || [];
    let start = count == -1 ? 0 : delays.length - count;
    delays.forEach((res,index) => {
      if(index >= start){
        res(cb);
      }
    });
    this.delays[evtName] = [];
  }
  off(evtName,callback){
    let cbs = this.cbs[evtName];
    if(cbs){
      let index = cbs.indexOf(callback);
      if(index > -1){
        cbs.splice(index,1);
      }
    }
  }
  emitNeed(evtName,data){
    return new Promise((resolve,reject) => {
      this.emit(evtName,{
        resolve,
        reject,
        data
      })
    });
  }
  onNeed(evtName,callback){
    let fn = res => {
      let { resolve = NOOP,reject = NOOP,data } = res;
      Promise.resolve(callback(data)).then(res => resolve(res),err => reject(err));
    }
    this.on(evtName,fn);
    return () => {
      this.off(evtName,fn);
    }
  }
  onNeeds(cbs){
    let offNeeds = []
    for(var key in cbs){
      let cb = cbs[key];
      let fn = this.onNeed(key,cb);
      offNeeds.push(fn);
    }
    return () => {
      offNeeds.forEach(res => {
        res();
      });
    }
  }
  destroy(){
    this.cbs = null;
    this.delays = null;
  }
}
