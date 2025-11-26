<template>
  <view class="creditConfirm">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="cc-inner">
      <view class="cc-pic"></view>
      <view class="cc-text">兑换成功</view>
      <view class="cc-btn1" @tap="onIndex">继续逛逛</view>
      <view class="cc-btn2" @tap="onList">立即使用</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title : `积分换礼`
    }
  },
  onLoad() {
    
  },
  methods: {
    onIndex(){
      this.$Router.pushTab({
        name : 'index'
      })
    },
    onList(){
      this.$Router.push({
        name : 'my.exchange'
      })
    }
  }
}
</script>
