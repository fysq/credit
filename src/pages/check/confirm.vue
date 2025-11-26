<template>
<view class="checkConfirm cc" v-if="isLoad">
  <view class="cc-inner base">
    <view class="cc-title">请核对以下信息</view>
    <view class="cc-info">
      <view class="cc-row flex flex-main-justify">
        <view class="cc-label flex-box0">优惠券：</view>
        <view class="cc-value">{{ state.coupon_info.title }}</view>
      </view>
      <view class="cc-row flex flex-main-justify">
        <view class="cc-label flex-box0">优惠金额：</view>
        <view class="cc-value">￥{{ state.coupon_info.discount_amount }}</view>
      </view>
      <view class="cc-row flex flex-main-justify">
        <view class="cc-label flex-box0">有效期：</view>
        <view class="cc-value">{{ state.coupon_info.start_time  }}到{{ state.coupon_info.end_time }}</view>
      </view>
      <view class="cc-row flex flex-main-justify">
        <view class="cc-label flex-box0">核销地点：</view>
        <view class="cc-value">{{ state.coupon_info.writeoff_place }}</view>
      </view>
      <view class="cc-row flex flex-main-justify">
        <view class="cc-label flex-box0">用户名：</view>
        <view class="cc-value">{{ state.nick_name }}</view>
      </view>
      <view class="cc-row flex flex-main-justify">
        <view class="cc-label flex-box0">手机号：</view>
        <view class="cc-value">{{ state.phone }}</view>
      </view>
    </view>
    <view class="cc-b3">
      <view class="cc-btn" @tap="onConfirm">确认核销</view>
    </view>
  </view>
</view>
</template>
<script>
export default{
  data(){
    return {
      isLoad : false,
      state : {},
    }
  },
  onLoad: function(options){
    this.options = options;
    let scene = options.scene;
    if(scene){
      options.id = scene;
      this.options = options;
    }
    const { id } = options;
    app.user.getUid().then(uid => {
      this.uid = uid;
      return this._api.userCouponDetail({
        coupon_id  : this.options.id,
        uid
      })
    })
    .then(res => {
      this.state = res;
      this.isLoad = true;
    })
  },
  methods : {
    onConfirm(){
      const { id } = this.options;
      const { uid } = this;
      this._api.checkConfirm({
        uid,
        coupon_id : id
      }).then(() => {
        let { state } = this;
        let data = {
          title : state.coupon_info.title,
          price : state.coupon_info.discount_amount,
          nick_name : state.nick_name,
          phone : state.phone
        }
        let res = {
          status : 1
        }
        let json = app.global.encodeUrlJson(res);
        let json_data = app.global.encodeUrlJson(data);
        let url = `check/result?json=${ json }&data=${ json_data }`;
        app.router.link(url,{
          type : 'redirect'
        });
      })
    }
  }
}
</script>
<style>
page{
  background:#f8f8f8!important;
}
</style>
