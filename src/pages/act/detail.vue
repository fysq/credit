<template>
  <view class="activityDetail">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <block v-if="isLoad">
      <view class="ad-info activityDetailInfo">
        <view class="adi-tag"><commonTag :progress="state.progress"></commonTag></view>
        <view class="adi-pic">
          <image :src="imageFormat(state.cover,690,270)" class="blockImg"></image>
        </view>
        <view class="adi-info">
          <view class="adi-share">
            <button open-type="share" class="adi-share-btn"></button>
          </view>
          <view class="adi-n1">{{ state.title }}</view>
          <view class="adi-n2 adi-row"><span class="adi-label">活动时间</span><span class="adi-value">{{ timeRange(state.start_time,state.end_time)}}</span></view>
          <view class="adi-n4 adi-row"><span class="adi-label">活动地址</span><span class="adi-value">{{ state.address }}</span></view>
          <view class="adi-n3">
            <view class="adi-p1">参与人数</view>
            <view class="adi-ps">
              <view class="adi-user" :class="{ 'isdefault' : !item }" v-for="(item,index) in state.join_user_icon_arr" :key="index">
                <image :src="item" class="blockImg"></image>
              </view>
              <!--view class="adi-user">
                <image src="http://dummyimage.com/46x46" class="blockImg"></image>
              </view>
              <view class="adi-user isdefault"></view>
              <view class="adi-user">
                <image src="http://dummyimage.com/46x46" class="blockImg"></image>
              </view>
              <view class="adi-user">
                <image src="http://dummyimage.com/46x46" class="blockImg"></image>
              </view-->
            </view>
            <view class="adi-pnum"><span class="adi-pem">{{ state.join_num }}</span>人已参与</view>
          </view>
        </view>
      </view>
      <view class="ad-rule">
        <view class="ad-rule-title">活动规则</view>
        <view class="ad-rule-row"><span class="ad-rule-label">报名时间</span><span class="ad-rule-content">{{ timeRange(state.sign_start_time,state.sign_end_time)}}</span></view>
        <view class="ad-rule-row"><span class="ad-rule-label">会员专享</span><span class="ad-rule-content">限会员参与</span></view>
        <view class="ad-rule-row" v-if="state.notice"><span class="ad-rule-label">温馨提醒</span><span class="ad-rule-content">{{ state.notice }}</span></view>
      </view>
      <view class="ad-editor">
        <view class="ad-editor-title">活动详情</view>
        <mp-html :content="state.content"></mp-html>
        <!--view class="ad-editor-pic" @tap="onPreview">
          <image src="http://dummyimage.com/650x430" class="blockImg"></image>
        </view>
        <view class="ad-rule2">
          <view class="ad-rule2-title">活动细则</view>
          <view class="ad-rule2-rows">
            <view class="ad-rule2-row">1、使用本券时请出示券码或二维码至现场工作人员处核销</view>
            <view class="ad-rule2-row">2、本次活动每人仅限报名一次;</view>
            <view class="ad-rule2-row">3、本券不可转增、不找雪、不兑现、逾期作废不补发，活动图片仅供参考，以实物为准</view>
            <view class="ad-rule2-row">4、报名时间：2024年1月13日-1月20日 活动时间：2024年1月21日13:30</view>
            <view class="ad-rule2-row">5、活动地点：钟楼区延陵西路123号常州吾悦广场A座 2F 连廊（JNBY旁）</view>
          </view>
        </view-->
      </view>
      <view class="ad-blank"></view>
      <view class="ad-tabbar" :class="{ 'is_iPhoneX' : is_iPhoneX }">
        <view class="ad-tabbar-inner">
          <view class="ad-tabbar-b1">
            <view class="ad-tabbar-c1">
            <view class="ad-tabbar-num"><span class="ad-tabbar-n1">{{ state.score }}</span>积分</view>
            </view>
            <view class="ad-tabbar-c2">成功核销后</view>
          </view>
          <view class="ad-tabbar-b2">
            <view class="ad-tabbar-btn" @tap="onSubmit">我要报名</view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>
<script>
export default {
  data() {
    return {
      is_iPhoneX : this.$store.getters.is_iPhoneX,
      title : `活动详情`,
      state : {},
      isLoad : false,
    }
  },
  onLoad(options) {
    this.id = options.scene;
    this.$api.actDetail({
      id : this.id
    }).then(res => {
      this.state = res;
      this.isLoad = true;
    })
  },
  onShareAppMessage(){
    return this.onShare();
  },
  onShareTimeline(){
    return this.onShare();
  },
  methods: {
    onShare(){
      this.$api.actShare({
        id : this.id
      });
      return {
        title : this.state.title,
        imageUrl : this.imageFormat(this.state.cover,500,400)
      }
    },
    onPreview(){
      uni.previewImage({
        urls : ['http://dummyimage.com/100x100'],
      })
    },
    onSubmit(){
      this.$store.dispatch('checkLogin').then(res => {
        this.$api.actSign({
          activity_id : this.id
        }).then(res => {
          this.$store.dispatch('requestSubscribeMessage',{
            id : this.id,
            type : 1
          }).then(res => {
            setTimeout(() => {
              this.$Router.push({
                name : 'act.confirm',
                params : {
                  id : 0
                }
              })
            },1e3);
          })
        })
      });
    }
  }
}
</script>
