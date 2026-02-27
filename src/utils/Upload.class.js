import { Observable } from '../libs/Rx'
import config from '../static/config'
import { Subject } from '../libs/Rx.js'
import Api from '@/pages/class/Api.class.js'
import store from '../store/index.js'


//let uptokenURL = config.HOST + res.resold.qiniu_uptoken_url;

class Upload {
  static getInstance() {
    if (!this.instance) {
      this.instance = new Upload()
    }
    return this.instance;
  }
  constructor() {
    store.dispatch('getConfig').then(res => {
      this.config = res;
    })
  }
  getToken() {
    return new Promise((resolve, reject) => {
      if (this._tokenData && this._tokenExpire > Date.now()) {
        resolve(this._tokenData);
        return;
      }
      uni.request({
        url: config.host + '/frontend/common/token',
        success: (res) => {
          if (res.data && res.data.data) {
            this._tokenData = res.data.data;
            this._tokenExpire = Date.now() + 50 * 60 * 1000;
            resolve(this._tokenData);
          } else {
            console.error('Token load error', res);
            reject('get token failed');
          }
        },
        fail: (err) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }
  upVideo$(files, options = { type: 'concat' }) {
    let files$ = Observable.from(files);
    let up$ = null;
    console.log(options.type);
    switch (options.type) {
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
  up$(files, options = { type: 'concat' }) {
    let files$ = Observable.from(files);
    let up$ = null;
    console.log(options.type);
    switch (options.type) {
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
  upJoin(files) {
    return new Promise(resolve => {
      this.up$(files).toArray().subscribe(v => resolve(v));
    })
  }
  _upSingle(filePath) {
    return new Promise((resolve, reject) => {
      this.getToken().then(tokenData => {
        let fileName = filePath.split('//')[1] || filePath.split('/').pop() || (new Date().getTime() + '.jpg');
        let key = (new Date()).getFullYear() + '/' + ((new Date()).getMonth() + 1) + '/' + (new Date()).getDate() + '/' + (new Date()).getTime() + Math.floor(Math.random() * 1e6) + '/' + fileName;

        let formData = {
          'key': key,
          'success_action_status': '200',
        };

        if (tokenData['x-oss-signature-version']) {
          formData['x-oss-signature-version'] = tokenData['x-oss-signature-version'];
          formData['x-oss-credential'] = tokenData['x-oss-credential'];
          formData['x-oss-date'] = tokenData['x-oss-date'];
          if (tokenData['x-oss-security-token']) {
            formData['x-oss-security-token'] = tokenData['x-oss-security-token'];
          }
          formData['policy'] = tokenData.policy || '';
          formData['x-oss-signature'] = tokenData['x-oss-signature'];
        } else if (tokenData.signature || tokenData.x_oss_signature) {
          // Compatibility with older mixed V4 response format just in case it's cached or old server
          if (tokenData.x_oss_signature_version) {
            formData['x-oss-signature-version'] = tokenData.x_oss_signature_version;
            formData['x-oss-credential'] = tokenData.x_oss_credential;
            formData['x-oss-date'] = tokenData.x_oss_date;
            if (tokenData.security_token) {
              formData['x-oss-security-token'] = tokenData.security_token;
            }
            formData['policy'] = tokenData.policy || '';
            formData['x-oss-signature'] = tokenData.signature || tokenData.x_oss_signature;
          } else {
            formData['policy'] = tokenData.policy || '';
            formData['signature'] = tokenData.signature;
            if (tokenData.accessid) formData['OSSAccessKeyId'] = tokenData.accessid;
          }
        } else if (tokenData.token) {
          // fallback to qiniu if backend switch back
          formData['token'] = tokenData.token;
        } else {
          // Maybe tokenData itself is string (qiniu)
          if (typeof tokenData === 'string') formData['token'] = tokenData;
        }

        let picRoot = (this.config && this.config.picRoot) ?
          this.config.picRoot.replace(/\/$/, "") :
          (config.qiniuHost || config.image_domain || "").replace(/\/$/, "");

        uni.uploadFile({
          url: picRoot,
          filePath: filePath,
          name: 'file',
          formData: formData,
          success: (res) => {
            if (res.statusCode === 200 || res.statusCode === 204) {
              resolve({
                imageURL: picRoot + '/' + key,
                originSrc: filePath
              });
            } else {
              let dataObject;
              try {
                dataObject = JSON.parse(res.data);
                if (dataObject.key) {
                  resolve({
                    imageURL: picRoot + '/' + dataObject.key,
                    originSrc: filePath
                  });
                  return;
                }
              } catch (err) { }
              reject(res);
            }
          },
          fail: (error) => {
            reject(error);
          }
        });
      }).catch(err => {
        reject(err);
      });
    });
  }
  chooseImage(config) {
    const { limit } = config;
    let source$ = new Subject();
    uni.chooseImage({
      count: limit,
      success: res => {
        this.showLoading();
        const { tempFilePaths } = res;
        this.up$(tempFilePaths).subscribe({
          next: res => {
            source$.next(res);
          },
          complete: res => {
            source$.complete();
            this.hideLoading();
          },
        });
      }
    });
    return source$;
  }
  chooseFile(config) {
    const { limit } = config;
    let source$ = new Subject();
    wx.chooseMessageFile({
      count: limit,
      type: 'file',
      extension: config.extension,
      success: res => {
        this.showLoading();
        const tempFilePaths = res.tempFiles.map(res => res.path);
        this.up$(tempFilePaths).subscribe({
          next: res => {
            source$.next(res);
          },
          complete: res => {
            source$.complete();
            this.hideLoading();
          },
          error: error => {
            uni.showToast({
              title: error,
              icon: 'none'
            })
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    });
    return source$;
  }
  showLoading() {
    uni.showLoading({
      title: `正在上传中`
    })
  }
  hideLoading() {
    uni.hideLoading();
  }
}
export default Upload;
