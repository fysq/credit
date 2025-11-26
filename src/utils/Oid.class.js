import Api from './Api.class'
console.log(Api);

export default class Oid{
  constructor(){
    this._promise = null;
  }
  static getInstance(){
    if(!this._instance){
      this._instance = new Oid();
    }
    return this._instance;
  }
  get(){
    if(!this._promise){
      this._promise = 
        new Promise(resolve => {
          wx.login({
            success : ({ code }) => {
              //return `test110`;
              //现在这个报错
              //console.log(code);
              Api.userLogin({ code }).then(({ openid }) => {
                resolve(openid);
              });
            },
            fail(err){
              console.log(err);
            }
          })
        })
    }
    return this._promise;
  }
}
