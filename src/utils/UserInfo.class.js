import Api from './Api.class'
import { Subject } from '../libs/Rx'
import Oid from './Oid.class.js'
import ShareTimeLine from './ShareTimeLine.class.js'
import ProfileUserInfo from './ProfileUserInfo.class.js'

class UserInfo{
  constructor(){
    this.oid = Oid.getInstance();
    this.uinfo = new Uinfo(this.oid);
    UserInfo.instance = this;
  }
  static getInstance(){
    if(!this.instance){
      this.instance = new UserInfo();
    }
    return this.instance;
  }
  watchUpdate$(){
    return this.uinfo.getWatch();
  }
  _getUserInfo({ cache = true } = {}){
    return this.uinfo.get({
      cache
    }).then(res => {
      const { uid } = res;
      return res;
    })
  }
  //先通过openid查用户信息，如果没有的话，再授权登录
  getUserInfo({ cache = true } = {}){
    return new Promise((resolve,reject) => {
      this.checkAuth().then(res => {
        this._getUserInfo({ cache }).then(res => {
          resolve(res)
        },err => {
          reject(err);
        })
      },err => {
        reject(err);
      })
    })
  }
  login(){
    return ProfileUserInfo.loginAndReg();
  }
  loginUInfo(){
    return ProfileUserInfo.loginAndRegUInfo();
  }
  getOpenid(){
    return this.oid.get();
  }
  checkAuth(){
    return ProfileUserInfo.checkAuth();
  }
  getAuthPhone(e){
    return this.getOpenid().then(openid => {
      //这里如果是第一次可能需要延迟哦，实际情况不会发生，会先登陆拿到openid的
      const { iv,encryptedData } = e.detail;
      const params = {
        iv,encryptedData,openid
      };
      return Api.decryptPhone(params).then(obj => obj.data);
    },error => {
      return error;
    })
  }
}



class Uinfo{
  constructor(oid){
    this.oid = oid;
    this._promise = null;
    this._userinfowatch$ = new Subject();
  }
  get(options = { cache : true }){
    return ProfileUserInfo.get(options).then(res => {
      this._userinfowatch$.next(res);
      return res;
    });
  }
  getWatch(){
    return this._userinfowatch$;
  }
  _updateUserInfo(userInfo){
    return Api.userInfoUpdate(userInfo).then(obj => obj.data);
  }
}
export default UserInfo;

