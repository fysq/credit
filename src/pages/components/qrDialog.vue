<template>
  <view class="qrDialog" v-if="isshow">
    <view class="qd-inner animated fadeIn">
      <view class="qd-b1">
        <view class="qd-title">{{ item.title }}</view>
        <view class="qd-time"><span class="qd-time-label">活动时间</span>{{ timeRange(item.start_time,item.end_time) }}</view>
      </view>
      <view class="qd-b2">
        <view class="qd-b2-title">活动核销码</view>
        <view class="qd-b2-qr">
          <image :src="url" class="blockImg" show-menu-by-longpress="true"></image>
        </view>
        <view class="qd-b2-tip">凭核销码联系现场工作人员进行核销</view>
      </view>
      <view class="qd-close" @tap="hide"></view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      isshow : false,
      url : '',
      item : {},
    }
  },
  mounted() {
    
  },
  methods: {
    show(options){
      this.url = options.url;
      this.item = options.item;
      this.isshow = true;
    },
    hide(){
      this.isshow = false;
    }
  }
}
</script>
