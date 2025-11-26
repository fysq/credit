<template>
  <view class="emptyMod">
    <view class="em-inner" :style="style">
      <view class="em-pic"></view>
      <view class="em-text">暂无内容</view>
    </view>
  </view>
</template>
<script>
export default {
  props : {
    pt : {
      default : 200
    },
    pb : {
      default : 200
    }
  },
  computed : {
    style(){
      return `padding-top:${ this.pt }rpx;padding-bottom:${ this.pb }rpx`;
    }
  },
  data() {
    return {
    }
  },
  onLoad() {
    
  },
  methods: {
  }
}
</script>
