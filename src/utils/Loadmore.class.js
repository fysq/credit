export default class Loadmore{
  constructor(options){
    const { callback } = options || {};
    Object.assign(this,options);
    this.list = [];
    this.page = 1;
    this.islock = false;
    this.isloading = false;
    this.loadedCallbacks= []
    if(callback){
      this.loadedCallbacks.push(callback);
    }
    this.isdestroy = false;
    this.hasload = false;
    this.isfirst = true;
  }
  load(){
    if(this.isdestroy) return;
    let { request,loadedCallbacks,list,page,params = {},islock,isloading } = this;
    if(isloading) return;
    if(islock){
      return;
      //const data = {
        //islock : true,
        //list : list
      //}
      //this.runCallback(data);
    }else{
      this.isloading = true;
      params.page = page; 
      request(params).then(res => {
        const oldList = this.list;
        this.list = [...oldList,...res.list];
        if(page < res.pageCount){
          this.page += 1;
        }else{
          this.islock = true;
        }
        const data = {
          list : this.list,
          islock : this.islock,
          isfirst : this.isfirst,
          count : res.count,
          res : res,
        }

        this.runCallback(data);
        this.isfirst = false;
        this.isloading = false;
        this.hasload = true;
      });
    }
    return this;
  }
  update(res){
    this.list = res.list;
    const data = {
      list : this.list,
      islock : this.islock,
      isfirst : this.isfirst,
      count : res.count,
      res : res,
    }
    this.runCallback(data);
  }
  getList(){
    const data = {
      list : this.list,
      islock : this.islock
    }
    return Promise.resolve(data);
  }
  runCallback(data){
    const { loadedCallbacks } = this;
    if(loadedCallbacks.length){
      loadedCallbacks.forEach(loaded => loaded(data));
    }
  }
  subscribe(callback){
    this.loadedCallbacks.push(callback);
    return this;
  }
  reset(){
    this.page = 1;
    this.list = [];
    this.islock = false;
    return this;
  }
  destroy(){
    this.loadedCallbacks = [];
    this.list = [];
    this.page = 1;
    this.isdestroy = true;
    return this;
  }
}
