<template>
<view class="commonSearch">
  <view class="cs-place"></view>
  <view class="cs-fix" :style="style">
    <view class="cs-inner" @tap="onFocus">
      <view class="cs-placeholder" v-if="!focused">{{ placeholder }}</view>
      <view class="cs-input" v-if="focused">
        <view class="cs-icon"></view>
        <input type="text" :placeholder="placeholder" :focus="focusedInput" v-model="kw" confirm-type="search" @confirm="onConfirm" placeholder-style="color:#7e818a"/>
        <view class="cs-clear" @tap="onClear" v-if="kw.length"></view>
      </view>
    </view>
  </view>
</view>
</template>
<script>
export default {
  props : ['placeholder'],
  data() {
    return {
      focused : false,
      focusedInput : false,
      kw : '',
      style : {}
    }
  },
  created() {
    let statusBarHeight = this.$store.getters.statusBarHeight;
    this.style = `top:${ statusBarHeight }px`;
  },
  methods: {
    onFocus(){
      this.focused = true;
      this.focusedInput = true;
    },
    onClear(){
      this.kw = '';
      this.$emit('confirm',{
        kw : this.kw
      });
      this.focusedInput = false;
    },
    onConfirm(){
      this.$emit('confirm',{
        kw : this.kw
      });
      this.focusedInput = false;
    }
  }
}
</script>
