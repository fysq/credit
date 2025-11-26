<template>
  <view class="myLogin">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="ml-info">
      <view class="ml-i1">会员享有以下特权</view>
      <view class="ml-i2">
        <view class="ml-legend">积分兑礼</view>
        <view class="ml-value">会员可以使用积分兑换商品或服务</view>
      </view>
      <view class="ml-i2">
        <view class="ml-legend">注册送积分</view>
        <view class="ml-value">注册会员，即可获得{{ config.login_score }}积分</view>
      </view>
    </view>
    <view class="ml-btn" @tap="onLogin">手机号快捷登录<button @getphonenumber="onGetPhone" open-type="getPhoneNumber" class="ml-phone" v-if="state.agree"></button></view>
    <view class="ml-agree" :class="{ 'on' : state.agree }" @tap="onAgree">我已阅读并同意<span class="ml-link" @tap.stop="onAgreeLink">《会员服务协议及隐私条款》</span></view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title : `注册登录`,
      state : {
        agree : false,
      },
      apply : false,
      config : {},
      isLoad : false,
    }
  },
  onLoad() {
    if(this.$Route.query.apply){
      this.apply = true;
    }

    this.$store.dispatch('getConfig').then(res => {
      this.config = res;
      this.isLoad = true;
    })
  },
  methods: {
    onLogin(){
      if(!this.state.agree){
        uni.showToast({
          title : `请先阅读并同意会员服务协议及隐私条款`,
          icon : 'none'
        })
      }
    },
    onGetPhone(e){
      if(e.detail.iv){
        this.$store.dispatch('decryptPhone',e).then(res => {
          if(this.apply){
            this.$Router.replace({
              name : 'my.apply'
            })
          }else{
            const eventChannel = this.getOpenerEventChannel();
            uni.navigateBack();
            eventChannel.emit('loginSuccess');
          }
        })
      }
    },
    onAgree(){
      this.state.agree = !this.state.agree;
    },
    onAgreeLink(){
      this.$Router.push({
        name : 'my.agreement'
      })
    }
  }
}
</script>
