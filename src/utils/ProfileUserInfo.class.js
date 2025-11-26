//适配新的用户体系
import Oid from './Oid.class.js'
import Api from './Api.class'
import { cacheObj,cacheFn } from '@/utils/common.esm.js'

const oid = Oid.getInstance();
export default class ProfileUserInfo{
  constructor(){
  }
  static checkAuth(refresh = false){
    if(!this.checkAuth$ || refresh){
      this.checkAuth$ = new Promise((resolve,reject) => {
        this.get({
          cache : !refresh
        }).then(res => {
          res = res || {};
          resolve();
        });
      })
    }
    return this.checkAuth$;
  }
  //获取用户信息
  static get(options = { cache : true }){
    return cacheFn('ProfileUserInfo.get',res => {
      return oid.get().then(openid => {
        return Api.getUserInfo(openid)
      })
      .then(res => {
        uni.setStorageSync('hjyxuser',res);
        return res;
      })
    },options.cache)
  }
  static set(userInfo){
    return oid.get().then(openid => {
      let params = {
        userInfo,
        openid
      }
      return Api.userInfoUpdate(params).then(obj => obj.data);
    })
    .then(res => this.checkAuth(true));
  }
  static login(){
    return this.goLogin();
    return new Promise((resolve,reject) => {
      uni.getUserProfile({
        desc : `我们需要您的授权，以继续操作`,
        success : res => {
          const { userInfo } = res;
          //这里重新设置
          resolve(userInfo);
        },
        fail : () => {
          reject();
        }
      })
    })
  }
  static goLogin(){
    return new Promise(resolve => {
      wx.navigateTo({
        url : '/pages/login',
        events : {
          loginSuccess(data){
            resolve(data);
          }
        }
      })
    })
  }
  static loginAndReg(){
    //首先检测是否登录了如果登录直接返回
    return new Promise((resolve,reject) => {
      this.checkAuth().then(res => {
        resolve()
      },err => {
        //如果没有授权，那么先授权再注册，再更新授权信息，再返回
        this.login().then(userInfo => {
          return this.set(userInfo)
        }).then(res => {
          this.checkAuth(true);
          resolve();
        })
      })
    })
  }
  static loginAndRegUInfo(){
    //首先检测是否登录了如果登录直接返回
    return new Promise((resolve,reject) => {
      this.checkAuth().then(res => {
        this.get().then(res => {
          if(res.nick_name && res.nick_name!= '微信用户'){
            resolve();
          }else{
            //如果没有授权，那么先授权再注册，再更新授权信息，再返回
            this.login().then(userInfo => {
              return this.set(userInfo);
            }).then(res => {
              resolve();
            })
          }
        })
      })
    })
  }
}

ProfileUserInfo.debug = 1;
