<template>
  <view class="myCreditRule">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="mcr-inner">
      <view class="mcr-b1 creditInfo">
        <view class="ci-r1">
          <view class="ci-c1">当前积分</view>
          <!--view class="ci-c2">积分规则</view-->
        </view>
        <view class="ci-r2">
        <view class="ci-num">{{ user.score }}</view>
          <view class="ci-btns">
            <view class="ci-btn" @tap="onExchange">去兑礼</view>
          </view>
        </view>
      </view>
      <view class="mcr-b2" v-if="isLoad && config.score_rule">
        <mp-html :content="config.score_rule"></mp-html>
        <!--
        <view class="mcr-item">
          <view class="mcr-title">赚取积分</view>
          <view class="mcr-content">
            <view class="mcr-row" v-if="config.consume_score_enable == 1"><span class="mcr-em">消费积分：</span>根据消费金额获得相应积分，鼓励会员多消费(消费积分的标准和审核方式比如按次积分{{ config.consume_score }}分，提交采购凭证，后台审核)。</view>
            <view class="mcr-row" v-if="config.publicize_score_enable == 1"><span class="mcr-em">宣传积分：</span>每篇信息宣传稿获得{{ config.publicize_score }}积分，鼓励会员积极参与宣传(提交凭证，后台审核)。</view>
            <view class="mcr-row" v-if="config.activity_score_enable == 1"><span class="mcr-em">活动积分：</span>报名参加新联会志愿活动，每次获得{{ config.activity_score }}积分(提交凭证，后台审核)。</view>
            <view class="mcr-row" v-if="config.login_score_enable == 1"><span class="mcr-em">注册积分：</span>新注册一卡通会员获得{{ config.login_score }}积分。</view>
          </view>
        </view>
        <view class="mcr-item">
          <view class="mcr-title">消耗积分</view>
          <view class="mcr-content">
            <view class="mcr-row"><span class="mcr-em">积分兑换：</span>根据消费金额获得相应积分，鼓励会员多消费(消费积分的标准和审核方式比如按次积分10分，提交采购凭证，后台审核)。</view>
          </view>
        </view-->
      </view>
    </view>
  </view>
</template>
<script>
export default {
  computed : {
    user(){
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {
      title : `积分规则`,
      config : {},
      isLoad : false
    }
  },
  onLoad() {
    this.$store.dispatch('getConfig').then(res => {
      this.config = res;
      this.isLoad = true;
    })
  },
  methods: {
    onExchange(){
      this.$Router.push({
        name : 'credit'
      })
    }
  }
}
</script>
