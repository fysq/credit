<template>
  <view class="activityConfirm">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="ac-inner">
      <view class="ac-pic"></view>
      <view class="ac-t1">报名成功</view>
      <view class="ac-t2">可至【我的】-【我的活动】中查看报名详情</view>
      <view class="ac-t3">
        <view class="ac-btn1" @tap="onDetail">查看报名信息</view>
        <view class="ac-btn2">分享给好友<button class="ac-share" open-type="share"></button></view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title : `商户详情`
    }
  },
  onLoad() {
    uni.hideShareMenu();
  },
  methods: {
    onDetail(){
      this.$Router.push({
        name : 'my.act'
      })
    }
  },
  onShareAppMessage(){
  }
}
</script>
