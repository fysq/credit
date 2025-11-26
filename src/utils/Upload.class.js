import qiniuUploader from '../libs/qiniuUploader'
import { Observable } from '../libs/Rx'
import config from '../static/config'
import { Subject } from '../libs/Rx.js'
import Api from '@/pages/class/Api.class.js'
import store from '../store/index.js'


//let uptokenURL = config.HOST + res.resold.qiniu_uptoken_url;

class Upload{
  static getInstance(){
    if(!this.instance){
      this.instance = new Upload()
    }
    return this.instance;
  }
  constructor(){
    store.dispatch('getConfig').then(res => {
      this.config = res;
    })
  }
  upVideo$(files,options = { type : 'concat' }){
    let uptokenURL = config.host + '/frontend/common/token';
    qiniuUploader.init({
      region: 'ECN',
      domain: this.config.picRoot,
      uptokenURL: uptokenURL
    });
    let files$ = Observable.from(files);
    let up$ = null;
    console.log(options.type);
    switch(options.type){
      case 'concat':
        up$ = files$.concatMap(v => {
          return this._upSingle(v);
        })
        break;
      case 'merge':
      default:
        up$ = files$.mergeMap(v => {
          return this._upSingle(v);
        })
      break;
    }
    return up$;
  }
  up$(files,options = { type : 'concat' }){
    let uptokenURL = config.host + '/frontend/common/token';
    qiniuUploader.init({
      region: 'ECN',
      domain: this.config.picRoot,
      uptokenURL: uptokenURL
    });
    let files$ = Observable.from(files);
    let up$ = null;
    console.log(options.type);
    switch(options.type){
      case 'concat':
        up$ = files$.concatMap(v => {
          return this._upSingle(v);
        })
        break;
      case 'merge':
      default:
        up$ = files$.mergeMap(v => {
          return this._upSingle(v);
        })
      break;
    }
    return up$;
  }
  upJoin(files){
    return new Promise(resolve => {
      this.up$(files).toArray().subscribe(v => resolve(v));
    })
  }
  _upSingle(filePath){
    return new Promise((resolve,reject) => {
      qiniuUploader.upload(filePath, (res) => {
        res.originSrc = filePath;
        resolve(res);
      }, (error) => {
        reject(res);
        console.log('error: ' + error);
      });
    })
  }
  chooseImage(config){
    const { limit } = config;
    let source$ = new Subject();
    uni.chooseImage({
      count : limit,
      success : res => {
        this.showLoading();
        const { tempFilePaths } = res;
        this.up$(tempFilePaths).subscribe({
          next : res => {
            source$.next(res);
          },
          complete : res => {
            source$.complete();
            this.hideLoading();
          },
        });
      }
    });
    return source$;
  }
  chooseFile(config){
    const { limit } = config;
    let source$ = new Subject();
    wx.chooseMessageFile({
      count : limit,
      type : 'file',
      extension : config.extension,
      success : res => {
        this.showLoading();
        const tempFilePaths = res.tempFiles.map(res => res.path);
        this.up$(tempFilePaths).subscribe({
          next : res => {
            source$.next(res);
          },
          complete : res => {
            source$.complete();
            this.hideLoading();
          },
          error : error => {
            uni.showToast({
              title : error,
              icon : 'none'
            })
          }
        })
      },
      fail(res){
        console.log(res);
      }
    });
    return source$;
  }
  showLoading(){
    uni.showLoading({
      title : `正在上传中`
    })
  }
  hideLoading(){
    uni.hideLoading();
  }
}
export default Upload;
