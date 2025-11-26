<template>
  <view class="commonTag" :class="'t' + progress">{{ progressFormat(progress) }}</view>
</template>
<script>
export default {
  props : ['progress'],
  data() {
    return {
    }
  },
  mounted() {
    
  },
  methods: {
    progressFormat(status){
      return ['活动未开始','活动进行中','活动已结束'][status];
    },
  }
}
</script>
