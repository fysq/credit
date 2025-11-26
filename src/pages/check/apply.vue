<template>
<view class="checkApply ca">
  <view class="ca-b1">
    <view class="ca-pic"></view>
  </view>
  <view class="ca-b2">
    <view class="ca-row i1 flex flex-cross-center"><span>申请并成为核销员</span></view>
    <view class="ca-row i2 flex flex-dir-top flex-main-center"><span>用户持优惠券核销码至核销点</span><span>核销员使用微信扫一扫扫码核销</span></view>
    <view class="ca-row i3 flex flex-cross-center"><span>核销员核销成功，用户享受优惠</span></view>
  </view>
  <view class="ca-b3" :class="is_iPhoneX ? 'is_iPhoneX' : ''">
    <button class="ca-btn" @tap="onApply">同意授权并申请</button>
  </view>
  <view class="blank" style="height:40rpx;"></view>
</view>
</template>
<script>
export default{
  data(){
    return {
      is_iPhoneX : this.$store.getters.is_iPhoneX,
    }
  },
  onLoad(options){
    this.options = options;
    let scene = options.scene;
    if(scene){
      scene = this.$tool.decodeScene(scene);
      Object.assign(options,scene);
    }
    this.id = options.id;
    this.type = options.type;
  },
  methods : {
    onApply(e){
      this.$store.dispatch('getUid').then(uid => {
        return this.$api.checkApply({
          uid,
          id : this.id,
          type : this.type //1活动 2商家
        })
      })
      .then(res => {
        this.$Router.push({
          name : 'check.applyresult'
        })
      })
    }
  }
}
</script>
<style>
page{
  background:#FFFFFF;
}
</style>
