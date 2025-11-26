export default class ShareTimeLine{
  constructor(){
  }

  //判断是否是分享朋友圈
  static isShareTimeline(){
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
}
