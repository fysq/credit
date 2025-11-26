<template>
  <view>
    <view class="applyResult ar">
      <view class="ar-inner">
        <view class="ar-b1">
          <view class="ar-pic"></view>
        </view>
        <view class="ar-b2">
          <view class="ar-text">你的申请已提交</view>
          <view class="ar-subtext">后台审核中</view>
        </view>
        <view class="ar-b3 flex flex-main-justify">
          <view class="ar-btn b1" @tap="goIndex">返回首页</view>
          <button class="ar-btn b2" open-type="contact">联系客服</button>
        </view>
      </view>
    </view>
    <kefuDialog ref="c-kefuDialog"></kefuDialog>
  </view>
</template>
<script>
export default{
  data(){
    return {}
  },
  onLoad: function(options){
    this.options = options;
  },
  methods : {
    goKefu(){
      const c = this.$refs['c-kefuDialog'];
      c.show(1);
    },
    goIndex(){
      this.$Router.pushTab({
        name : 'index'
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
