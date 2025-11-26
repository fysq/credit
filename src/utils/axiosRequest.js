import axios from '../libs/axios'
import Qs from '../libs/qs'
import config from '../static/config'
import store from '../store/index'


axios.defaults.timeout = 30000
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const { app_id,version } = config;

const request = axios.create({
  baseURL : config.host + '/frontend',
  params : {},
  paramsSerializer: function(params) {
    if(!params.app_id){
      Object.assign(params,{
        app_id : app_id,
        version,
      });
      let uid;
      if(store.state.userInfo){
        uid = store.state.userInfo.uid;
      }
      if(uid){
        params.uid = uid;
      }
    }
    return Qs.stringify(params);
  },
  adapter : function (config) {
    let key = axios.getUri(config);
    return new Promise((resolve, reject) => {
      //let data = config.method === 'get' ? '' : Qs.stringify(config.data)
      // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
      if(config.data){
        let uid;
        if(store.state.userInfo){
          uid = store.state.userInfo.uid;
        }
        config.data = Object.assign(JSON.parse(config.data),{
          app_id,
          version,
        });
        if(uid){
          config.data.uid = uid;
        }
      }
      uni.request({
        url: axios.getUri(config),
        method: config.method,
        data: config.data,
        success: (res) => {
          return resolve(res)
        },
        fail: (err) => {
          return reject(err)
        }
      })
    });
  }
})

// 请求拦截器
request.interceptors.request.use(function (request) {
  // request.headers.token = 'token=11124654654687';
  // console.log(request) // 请求成功
  return request
}, function (error) {
  // console.log(error); // 请求失败
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  //console.log(response.data.data) // 响应成功
  if(response.statusCode == 200){
    if(response.data.code === 500){
      uni.showToast({
        title : response.data.msg,
        icon : 'none'
      });
      return Promise.reject(response);
    }else{
      return response;
    }
  }else{
    if(response.data.msg){
      uni.showToast({
        title : response.data.msg,
        icon : 'none'
      })
    }else{
      uni.showToast({
        title : JSON.stringify(response.data),
        icon : 'none'
      })
    }
    return Promise.reject(response);
  }
}, function (responseError) {
  // console.log(error); // 响应失败
  uni.showToast({
    title : JSON.stringify(responseError.data),
    icon : 'none'
  })
  return Promise.reject(responseError)
})

export { request }
