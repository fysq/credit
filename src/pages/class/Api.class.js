import config from '@/static/config.js';
import { request } from '@/utils/axiosRequest.js'
import { queueFn, cacheFn } from '@/utils/common.esm.js'
import Loadmore from '@/utils/Loadmore.class.js'
export default class Api {
  constructor() { }
  static userLogin(data) {
    data.decrypt = 1;
    var url = '/common/openid';
    return request.get(url, {
      params: data,
    }).then(res => res.data.data);
  }
  //解密电话号码
  static decryptPhone(data) {
    var url = '/common/decrypt-phone';
    return request.post(url, data).then(res => res.data)
  }
  //更新用户信息
  static userInfoUpdateBasic(data) {
    data.decode = 1;
    var url = '/user/update-basic';
    return request.post(url, data).then(res => res.data)
  }
  static userInfoUpdateDetail(data) {
    data.decode = 1;
    var url = '/user/update-info';
    return request.post(url, data).then(res => res.data)
  }
  //获取用户信息
  static getUserInfo(openid) {
    let params = {
      openid,
      decode: 1,
      hasInfo: 1,
      unsignup_return: 1,
    }
    let url = `/common/get-info`;
    return request.get(url, {
      params,
    }).then(res => res.data.data);
  }

  //全站配置
  static config() {
    let url = `/common/config`;
    return request.get(url).then(res => {
      return res.data.data;
    })
  }
  //首页
  static index() {
    let url = `/common/index`;
    return request.get(url).then(res => {
      return res.data.data;
    });
  }
  //广告浏览
  static adView(params) {
    let url = `/common/ad-view`;
    return request.post(url, params);
  }
  //广告点击
  static adHit(params) {
    let url = `/common/ad-hit`;
    return request.post(url, params);
  }
  //活动列表
  static actList(params) {
    let url = `/activity/list`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  static actListLoad(params) {
    return new Loadmore({
      request: v => this.actList(v),
      params
    })
  }
  //活动详情
  static actDetail(params) {
    let url = `/activity/detail`;
    return request.get(url, {
      params
    }).then(res => res.data.data)
      .then(res => {
        //res.join_user_icon_arr = new Array(20).fill('');
        res.join_user_icon_arr = res.join_user_icon_arr.slice(0, 10);
        return res;
      })
  }
  //活动参与记录
  static myActList(params) {
    let url = `/user/activity-record`;
    return request.get(url, {
      params
    }).then(res => res.data.data)
      .then(res => {
        res.list.forEach(res => {
          res.verify_name = ['未核销', '已核销', '已过期'][res.verify_status];
          if (res.activity) {
            res.activity.progressName = ['未开始', '进行中', '已结束'][res.activity.progress];
          }
        });
        return res;
      })
  }
  static myActListLoad(params) {
    return new Loadmore({
      request: v => this.myActList(v),
      params
    })
  }
  //活动报名
  static actSign(params) {
    let url = `/activity/sign-up`;
    return request.post(url, params);
  }
  //获得核销二维码
  static verifyCode(params) {
    let url = `/verify/qrcode`;
    return request.post(url, params).then(res => {
      return res.data.data;
    })
  }
  //核销活动
  static actCheck(params) {
    let url = `/verify/activity`;
    return request.post(url, params);
  }
  //核销商品
  static productCheck(params) {
    let url = `/verify/product`;
    return request.post(url, params);
  }
  //申请成为核销员
  static checkApply(params) {
    let url = `/verify/apply-verifyer`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  //订阅消息
  static subscribe(params) {
    let url = `/common/subcribe`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  //商家列表
  static shopList(params) {
    let url = `/shop/list`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  static shopListLoad(params) {
    return new Loadmore({
      request: v => this.shopList(v),
      params
    })
  }
  //商家详情
  static shopDetail(params) {
    let url = `/shop/detail`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  //商品列表
  static productList(params) {
    let url = `/product/list`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  static productListLoad(params) {
    return new Loadmore({
      request: v => this.productList(v),
      params
    })
  }
  //商品详情
  static productDetail(params) {
    let url = `/product/detail`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  //商品列表
  static discountList(params) {
    let url = `/discount/list`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  static discountListLoad(params) {
    return new Loadmore({
      request: v => this.discountList(v),
      params
    })
  }
  //商品详情
  static discountDetail(params) {
    let url = `/discount/detail`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  //兑换商品记录
  static myProductRecord(params) {
    let url = `/user/product-record`;
    return request.get(url, {
      params
    }).then(res => res.data.data)
      .then(res => {
        res.list.forEach(res => {
          res.verify_name = ['未核销', '已核销', '已过期'][res.verify_status];
        })
        return res;
      })
  }
  static myProductRecordLoad(params) {
    return new Loadmore({
      request: v => this.myProductRecord(v),
      params
    })
  }
  //用户积分记录
  static userScoreLog(params) {
    let url = `/user/score-log`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  static userScoreLogLoad(params) {
    return new Loadmore({
      request: v => this.userScoreLog(v),
      params
    })
  }
  //用户上传附件
  static scoreUpload(params) {
    let url = `/user/score-upload`;
    return request.post(url, params).then(res => res.data.data);
  }
  //附件上传记录
  static scoreUploadLog(params) {
    let url = `/user/score-upload-log`;
    return request.get(url, {
      params
    }).then(res => res.data.data)
      .then(res => {
        res.list.forEach(res => {
          res.name = ['', '宣传积分', '消费积分'][res.type];
        })
        return res;
      })
  }
  static scoreUploadLogLoad(params) {
    return new Loadmore({
      request: v => this.scoreUploadLog(v),
      params
    })
  }
  //增加分享量
  static actShare(params) {
    let url = `/activity/share`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  //增加分享量
  static shopShare(params) {
    return Promise.resolve();
    let url = `/shop/share`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  //商品兑换
  static productExchange(data) {
    let url = `/product/exchange`;
    return request.post(url, data).then(res => res.data)
  }
  //我的商品兑换详情
  static myProductRecordDetail(params) {
    let url = `/user/product-record-detail`;
    return request.get(url, {
      params
    }).then(res => res.data.data);
  }
  //是否核销员
  static actIsVerifyer(params) {
    let url = `/activity/is-verifyer`;
    return request.post(url, params).then(res => res.data.data);
  }
  //活动报名人员列表(核销端)
  static actAdminList(params) {
    let url = `/activity/reglist`;
    return request.post(url, params).then(res => {
      // res.data.data.list needs to be mapped to verify statuses
      if (res.data.data && res.data.data.list) {
        res.data.data.list.forEach(v => {
          v.verify_name = ['未核销', '已核销', '已过期'][v.verify_status] || '未核销';
        });
      }
      return res.data.data;
    });
  }
  static actAdminListLoad(params) {
    return new Loadmore({
      request: v => this.actAdminList(v),
      params,
      dataKey: 'list'
    })
  }
  //活动核销
  static actAdminHexiao(params) {
    let url = `/activity/hexiao`;
    return request.post(url, params).then(res => res.data);
  }
}
