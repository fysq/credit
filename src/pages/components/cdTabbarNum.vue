<template>
  <view class="cdTabbarNum">
    <view class="ctn-btn minus" @tap="onMinus" @longpress="onLong" @touchend="onEnd" :data-type="0" hover-class="ctn-hover"></view>
    <text class="ctn-input">{{ num }}</text>
    <view class="ctn-btn add" @tap="onAdd" @longpress="onLong" @touchend="onEnd" :data-type="1" hover-class="ctn-hover"></view>
  </view>
</template>
<script>
export default {
  props : ['value','stock'],
  data() {
    return {
      num : 1,
      max : 99,
    }
  },
  mounted() {
    
  },
  destroyed(){
    this.onEnd();
  },
  methods: {
    onAdd(){
      let num = this.num;
      num++;
      num = num > this.max ? this.max : num;
      this.num = num;
      this.$emit('input',num);
    },
    onMinus(){
      let num = this.num;
      num = num - 1;
      num = num < 1 ? 1 : num;
      this.num = num;
      this.$emit('input',num);
    },
    onLong(e){
      let { type } = e.currentTarget.dataset;
      let animate;
      if(type == 0){
        animate = setInterval(() => {
          this.onMinus();
        },100);
      }else if(type == 1){
        animate = setInterval(() => {
          this.onAdd();
        },100);
      }
      this.tid = animate;
    },
    onEnd(e){
      if(this.tid){
        clearInterval(this.tid);
      }
    }
  }
}
</script>
