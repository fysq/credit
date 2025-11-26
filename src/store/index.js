import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/pages/class/Api.class.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state : {
    a : 1,
    b : 2,
    openid : null,
    userInfo : null,
    userInfoLoad : false,
    systemInfo : null,
    loginDebug : false,
    defaultAva : 'https://s.hangjiayun.com/allxcx/credit/images/user-default.png?t=1',
    config : null,
  },
  getters : {
    isLogin(state){
      //-1未获取用户信息
      //0非注册用户
      //1注册用户，非会
      //2注册用户，会员
      if(!state.userInfoLoad){
        return -1;
      }else if(state.userInfo){
        if(state.userInfo.phone){
          //这里判断是否是vip
          let { vip_status } = state.userInfo;
          if(vip_status == 0 || vip_status == 2){
            return 1;
          }else if(vip_status == 1){
            return 2;
          }
        }else{
          return 0;
        }
      }
    },
    is_iPhoneX(state){
      let systemInfo;
      if(!state.systemInfo){
        let systemInfo = wx.getSystemInfoSync();
        state.systemInfo = systemInfo;
      }
      systemInfo = state.systemInfo;
      return /iPhone X|iPhone 1[1-9]/.test(systemInfo.model);
    },
    statusBarHeight(){
      let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44;
      return statusBarHeight;
    }
  },
  mutations : {

  },
  actions : {
    getOpenid({ state }){
      if(state.openid){
        return Promise.resolve(state.openid);
      }else{
        return new Promise(resolve => {
          wx.login({
            success : ({ code }) => {
              //return `test110`;
              //现在这个报错
              //console.log(code);
              Api.userLogin({ code }).then(({ openid }) => {
                state.openid = openid;
                resolve(openid);
              });
            },
            fail(err){
              console.log(err);
            }
          })
        })
      }
    },
    decryptPhone({ state,dispatch },e){
      return dispatch('getOpenid').then(openid => {
        const { iv,encryptedData } = e.detail;
        const params = {
          iv,encryptedData,openid
        };
        return Api.decryptPhone(params).then(res => res.data)
        .then(res => {
          return dispatch('getUserInfo',false).then(() => {
            return res;
          });
        })
      })
    },
    //登录校验，未登录去登录后回调
    checkLogin({ getters,dispatch }){
      return dispatch('getUserInfo').then(res => {
        if(getters.isLogin > 0){
          return Promise.resolve();
        }else{
          return new Promise(resolve => {
            uni.navigateTo({
              url : '/pages/my/login',
              events : {
                loginSuccess : () => {
                  resolve();
                }
              }
            })
          })
        }
      })
    },
    checkApply({ getters,dispatch }){
      return dispatch('getUserInfo').then(res => {
        if(getters.isLogin == 2){
          return Promise.resolve();
        }else{
          uni.navigateTo({
            url : '/pages/my/apply',
          })
        }
      })
    },
    getUserInfo({ state,dispatch },cache = true){
      if(state.userInfo && cache){
        return Promise.resolve(state.userInfo);
      }else if(this._userinfo$ && cache){
        return this._userinfo$;
      }else{
        this._userinfo$ = dispatch('getOpenid').then(openid => {
          return Api.getUserInfo(openid)
        })
        .then(res => {
          res.nickName = res.nick_name || '微信用户';
          res.avatarUrl = res.avatar_url || state.defaultAva;
          if(state.loginDebug){
            res.nickName = '微信用户';
            res.avatarUrl = state.defaultAva;
            res.phone = '';
            state.loginDebug = false;
          }
          state.userInfo = res;
          state.userInfoLoad = true;
          return state.userInfo;
        })
        return this._userinfo$;
      }
    },
    updateUserInfoBasic({ state,dispatch },userInfo){
      return dispatch('getOpenid').then(openid => {
        let params = {
          userInfo,
          openid
        }
        return Api.userInfoUpdateBasic(params);
      })
      .then(res => {
        return dispatch('getUserInfo',false);
      })
    },
    updateUserInfoDetail({ state,dispatch },userInfo){
      return dispatch('getOpenid').then(openid => {
        let params = {
          userInfo,
          openid
        }
        return Api.userInfoUpdateDetail(params);
      })
      .then(res => {
        return dispatch('getUserInfo',false);
      })
    },
    getUid({ dispatch }){
      return dispatch('getUserInfo').then(res => {
        return res.uid;
      })
    },
    requestSubscribeMessage({ state },data){
      let tmp;
      if(data.type == 1){
        //活动报名模板
        tmp = 'JUVqhJQs5B6kVDEUXjE35FEQKjC_P4-Ydh3K-gLkfaU';
      }
      if(data.type == 2){
        //积分兑换模板
        tmp = 'MW3O3zuxSTRvBCy5GC3hGHF3JMzAqpCurm2xQAuwunw';
      }
      return new Promise((resolve,reject) => {
        wx.requestSubscribeMessage({
          tmplIds: [tmp],
          success : (res) => {
            console.log(res);
            Api.subscribe(data);
          },
          fail(res){
            console.log(res);
          },
          complete(){
            resolve();
          }
        })
      })
    },
    getConfig({ state },cache = true){
      if(state.config){
        return Promise.resolve(state.config);
      }else{
        if(this.config$ && cache){
          return this.config$;
        }else{
          this.config$ = Api.config().then(res => {
            state.config = res;
            return res;
          });
          return this.config$;
        }
      }
    }
  }
})

