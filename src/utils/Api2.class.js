import config from '../static/config.js';
import { request } from './axiosRequest.js'

export default class Api{
  constructor(){}
  static userLogin(data){
    data.decrypt = 1;
    var url = '/frontend/user/login';
    return request.get(url,{
      params : data,
      baseURL : config.host
    }).then(res => res.data.data);
  }
  //解密电话号码
  static decryptPhone(data){
    var url = '/frontend/common/decrypt-phone';
    return request.post(url,data,{
      baseURL : config.host
    }).then(res => res.data)
  }
  //更新用户信息
  static userInfoUpdateBasic(data){
    data.decode = 1;
    var url = '/frontend/user/update-basic';
    return request.post(url,data,{
      baseURL : config.host
    }).then(res => res.data)
  }
  static userInfoUpdateDetail(data){
    data.decode = 1;
    var url = '/frontend/user/update-info';
    return request.post(url,data,{
      baseURL : config.host
    }).then(res => res.data)
  }
  //通用二维码接口
  static getErcode(data){
    const url = '/api/mini/user/applet-code';
    return request.get(url,{
      params : data,
      baseURL : config.host
    }).then(res =>{
      return res.data.data;
    })
  }
  //获取用户信息
  static getUserInfo(openid){
    let params = {
      openid,
      decode : 1,
      hasInfo : 1,
      unsignup_return : 1,
    }
    let url = `/frontend/common/get-info`;
    return request.get(url,{
      params,
      baseURL : config.host
    }).then(res => res.data.data);
  }
}


