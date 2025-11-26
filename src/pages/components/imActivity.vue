<template>
  <view class="imActivity">
    <view class="ia-list">
      <view class="ia-item" @tap="onDetail" v-for="(item,index) in list" :key="index" :data-item="item">
        <view class="ia-pic">
          <image :src="imageFormat(item.cover,690,270)" class="blockImg"></image>
          <view class="ia-tag commonTag" :class="'t' + item.progress">{{ progressFormat(item.progress) }}</view>
        </view>
        <view class="ia-info">
          <view class="ia-name">{{ item.title }}</view>
          <view class="ia-time"><span class="ia-time-label">活动时间</span>{{ timeRange(item.start_time,item.end_time)}}</view>
        </view>
      </view>
      <!--view class="ia-item">
        <view class="ia-pic">
          <image src="http://dummyimage.com/690x270" class="blockImg"></image>
          <view class="ia-tag t2">活动已结束</view>
        </view>
        <view class="ia-info">
          <view class="ia-name">粉雪小镇打卡活动</view>
          <view class="ia-time">活动时间  2024.03.25 00:00 至 2024.05.07 23:59</view>
        </view>
      </view-->
    </view>
  </view>
</template>
<script>
export default {
  props : ['list'],
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
    onDetail(e){
      const { id } = e.currentTarget.dataset.item;
      this.$Router.push({
        name : 'act.detail',
        params : {
          scene : id
        }
      })
    }
  }
}
</script>
