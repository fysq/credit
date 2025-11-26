let extConfig = __non_webpack_require__('../static/ext.js');
extConfig = Object.assign(extConfig, uni.getExtConfigSync ? uni.getExtConfigSync() : {});

if(extConfig.host.indexOf('yikatong.com') > -1){
  extConfig.image_domain = 'http://7xne5r.com1.z0.glb.clouddn.com/';
}else{
  extConfig.image_domain = 'https://yikatong-loveshang.oss-cn-hangzhou.aliyuncs.com/';
}

export default extConfig;
