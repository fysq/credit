<template>
  <view class="activityIndex">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx" :tabPage="true"/>
    <view class="ai-search">
      <commonSearch placeholder="请输入活动标题" @confirm="onConfirm"></commonSearch>
    </view>
    <view class="ai-activity imActivity">
      <block v-if="state.list.length > 0">
        <imActivity :list="state.list"></imActivity>
      </block>
      <empty v-if="state.list.length == 0 && state.islock"></empty>
      <view class="ia-list">
        <!--view class="ia-item">
          <view class="ia-pic">
            <image src="http://dummyimage.com/690x270" class="blockImg"></image>
            <view class="ia-tag commonTag t1">活动进行中</view>
          </view>
          <view class="ia-info">
            <view class="ia-name">粉雪小镇打卡活动</view>
            <view class="ia-time"><span class="ia-time-label">活动时间</span>  2024.03.25 00:00 至 2024.05.07 23:59</view>
          </view>
        </view>
        <view class="ia-item">
          <view class="ia-pic">
            <image src="http://dummyimage.com/690x270" class="blockImg"></image>
            <view class="ia-tag commonTag t2">活动已结束</view>
          </view>
          <view class="ia-info">
            <view class="ia-name">粉雪小镇打卡活动</view>
            <view class="ia-time">活动时间  2024.03.25 00:00 至 2024.05.07 23:59</view>
          </view>
        </view-->
      </view>
    </view>
    <tabbar></tabbar>
  </view>
</template>
<script>
import imActivity from '../components/imActivity.vue'
import commonList from '../mix/commonList.vue'
import moment from '@/libs/moment.min.js'
export default {
  mixins : [commonList],
  components : {
    imActivity
  },
  data() {
    return {
      title : `全部活动`,
      kw : '',
    }
  },
  onLoad() {
    this.reset();
  },
  methods: {
    commonListApi(){
      return this.$api.actListLoad({
        kw : this.kw
      });
    },
    onDetail(){
      this.$Router.push({
        name : 'act.detail'
      })
    },
    onConfirm(e){
      this.kw = e.kw;
      this.reset();
    }
  }
}
</script>
