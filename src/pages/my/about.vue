<template>
  <view class="myAbout commonTitleContent">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <block v-if="isLoad">
      <view class="ctc-inner">
        <view class="ctc-title">欢迎您使用新联会一卡通会员应用及服务</view>
        <view class="ctc-content">
          <mp-html :content="config.about_us"></mp-html>
          <!--text class="ctc-text">1为使用新联会一卡通小程序（以下简称“本应用”）及服务，您应当阅读并遵守《新联会一卡通小程序应用许可及服务协议（以下简称“本协议”），请您务必审阅读、充分理解名条款内容，特别是免除或者限制责任的条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。除非您已阅读并接受本协议所有条款，否则您无权使用本应用及相关服务。您的使用、获取新联会一卡通小程序账号、登录等行为即视为您已阅读并同意上述协议的约束。\n\n如果您未满18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议，并特别注意未成年人使用条款。\n新联会一卡通小程序所提供的各项服务的所有权和运作权均归XXXXX集团有限公司所有。\n新联会一卡通小程序用户使用协议（以下简称“本协议”）系由新联会一卡通小程序用户与XXXX集团有限公司就新联会一卡通小程序的各项服务所订立的相关权利义务规范。用户通过访问和/或使用</text-->
        </view>
      </view>
      <view class="ma-b2" :class="{ 'is_iPhoneX' : is_iPhoneX }">
        <view class="ma-fix">
          <view class="ma-btn" @tap="onCall">商务合作：{{ config.phone }}</view>
        </view>
      </view>
    </block>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title : `关于我们`,
      is_iPhoneX : this.$tool.is_iPhoneX(),
      config : {},
      isLoad : false,
    }
  },
  onLoad() {
    this.$store.dispatch('getConfig').then(res => {
      this.config = res;
      this.isLoad = true;
    });
  },
  methods: {
    onCall(){
      this.$tool.makePhoneCall(this.config.phone);
    }
  }
}
</script>
