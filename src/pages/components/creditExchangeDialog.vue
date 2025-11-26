<template>
  <view class="creditExchangeDialog" v-if="isshow">
    <view class="ced-inner animated fadeIn">
      <view class="ced-t1">确定要兑换此优惠券吗?</view>
      <view class="ced-t2">您将消耗<span class="ced-num">{{ num }}</span>积分</view>
      <view class="ced-t3">
        <view class="ced-btn b1" @tap="onCancel">取消</view>
        <view class="ced-btn b2" @tap="onOk">确认</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props : ['num'],
  data() {
    return {
      isshow : false,
    }
  },
  mounted() {
    
  },
  methods: {
    show(options = {}){
      this.num = options.num ?? this.num;
      this.isshow = true;
    },
    hide(){
      this.isshow = false;
    },
    onOk(){
      this.$emit('ok');
      this.hide();
    },
    onCancel(){
      this.hide();
    }
  }
}
</script>
