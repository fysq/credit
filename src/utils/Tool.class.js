import Qs from '../libs/qs.js'
export default class Global{
  constructor(){

  }
  static is_iPhoneX(){
    const systemInfo = this.getSystemInfoSync();
    return /iPhone X|iPhone 1[1-9]/.test(systemInfo.model);
  }
  static getSystemInfoSync(cache = true){
    if(!this._system || !cache){
      this._system = wx.getSystemInfoSync();
    }
    return this._system;
  }
  //转换成代理图片
  static converProxyImage(url){
    return `https://p.hangjiayun.com/img?to=${ url }`;
  }
  //判断是否是分享朋友圈
  static isShareTimeline(){
    //#ifndef MP-WEIXIN
    return false;
    //#endif
    let options = this.getLaunchOptionsSync();
    const { scene } = options;
    if(scene == 1154){
      return true;
    }else{
      return false;
    }
  }
  static getLaunchOptionsSync(){
    if(!this._launchOption){
      this._launchOption = uni.getLaunchOptionsSync();
    }
    return this._launchOption;
  }
  static getCurrentPage(){
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    return page;
  }
  //自定义七牛图片大小
  static convertImgSize(url = '',options = {}){
    if(url){
      const { width = 750,height = 600 } = options;
      url = url.replace(/\?.+/,'');
      url = url + `?imageView2/1/w/${ width }/h/${ height }/format/jpg/interlace/1/q/100|imageslim`;
    }
    return url;
  }
  static copyText(text){
    return wx.setClipboardData({
      data : text
    });
  }
  static preventDupClick(fn){
    if(this._islock){
      return;
    }else{
      this._islock = true;
      fn(res => {
        this._islock = false;
      });
    }
  }
  static makePhoneCall(phoneNumber){
    phoneNumber = phoneNumber.replace(/\s*转\s*/,',');
    return new Promise((resolve,reject) => {
      uni.makePhoneCall({
        phoneNumber,
        success(){
          resolve();
        },
        fail(){
          reject();
        }
      });
    })
  }
  //json加密url
  static encodeUrlJson(data = {}){
    return encodeURIComponent(JSON.stringify(data));
  }
  //json解密url
  static decodeUrlJson(json){
    return JSON.parse(decodeURIComponent(json));
  }
  //解析scene
  static decodeScene(scene){
    scene = decodeURIComponent(scene);
    return Qs.parse(scene);
  }
  static _compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  }
  static compareVersion(v1){
    const version = uni.getSystemInfoSync().SDKVersion
    if (this._compareVersion(version, v1) >= 0) {
      return true;
    }else{
      return false
    }
  }
}
