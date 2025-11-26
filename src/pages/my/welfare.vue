<template>
  <view class="myWelfare">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="mwf-b1"></view>
    <view class="mwf-b2">
      <view class="mwf-title">会员权益列表</view>
      <view class="mwf-content">
        <text class="mwf-text">1. 专享优惠：会员在参与组织的活动、合作商家消费或享受组织提供的服务时，能够享受到独家折扣、早鸟票价、VIP座位安排、额外赠品和优先处理等特权。\n2. 积分兑换：会员通过参与活动、消费或完成任务获得积分，可以用于兑换实物商品、优惠券、会员等级升级、特殊活动参与权等奖励。\n3. 节日礼物：在重要节日或个人纪念日，会员将收到组织的特别礼物或贺卡，表达组织的关怀和祝福。\n4. 会长关爱：会长通过一对一交流、职业规划建议、资源协调和在关键时刻的慰问，为会员提供个人成长和职业发展的支持。\n5. 专属活动：组织仅限会员参加的社交、户外探险、文化体验等活动，增强会员之间的联系和归属感。\n6. 健康服务：与健身、瑜伽等健康机构合作，为会员提供折扣或免费的健身课程，关注会员的身体健康。\n7. 商务合作：为会员提供商务拓展的机会，包括项目对接、资源共享、合作洽谈等，帮助会员拓展业务和市场。\n8. 会员之声：设立会员意见反馈渠道，让会员参与组织决策和活动规划，增强会员的参与感和影响力。</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title : `会员权益`
    }
  },
  onLoad() {
    
  },
  methods: {
  }
}
</script>
