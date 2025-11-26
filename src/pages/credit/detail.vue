<template>
  <view class="creditDetail">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <block v-if="isLoad">
      <view class="cd-i1">
        <view class="cd-pic">
          <image :src="imageFormat(detail.cover,690,430)" class="blockImg"></image>
        </view>
        <view class="cd-info">
          <view class="cd-share">
            <button class="cd-share-btn" open-type="share"></button>
          </view>
          <view class="cd-name">{{ detail.name }}</view>
          <view class="cd-sub">
            <view class="cd-b1">市场价{{ detail.origin_price }}元</view>
            <view class="cd-b2">已售<span class="cd-sell">{{ detail.sale }}</span>张</view>
          </view>
        </view>
      </view>
      <view class="cd-i2 shopInfo">
        <view class="cd-legend">适用商户</view>
        <view class="si-inner">
          <view class="cd-shop si-i1">
            <view class="si-name">{{ detail.shop.name }}</view>
            <view class="si-time"><span class="si-label">营业时间</span>{{ detail.shop.open_time }}</view>
            <view class="si-address"><span class="si-label">商家地址</span>{{ detail.shop.address}}</view>
          </view>
          <view class="si-call" @tap="onCall"></view>
        </view>
      </view>
      <view class="cd-i4">
        <view class="cd-legend">兑换规则</view>
        <view class="cd-notes">
          <view class="cd-note">
            <view class="cd-note-label">有效期</view>
            <view class="cd-note-content">{{ timeRange(detail.verify_start_time,detail.verify_end_time) }}</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">会员专享</view>
            <view class="cd-note-content">限会员参与</view>
          </view>
          <view class="cd-note" v-if="detail.is_limit">
            <view class="cd-note-label">数量限制</view>
            <view class="cd-note-content">每个帐号总限购{{ detail.limit_num }}份</view>
          </view>
        </view>
        <!--view class="cd-notes">
          <view class="cd-note">
            <view class="cd-note-label">使用场景</view>
            <view class="cd-note-content">到店核销 (单次可核销1张)</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">会员专享</view>
            <view class="cd-note-content">会员专享</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">购买限制</view>
            <view class="cd-note-content">每人每天限购1张，总限购1张</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">限购时间</view>
            <view class="cd-note-content">2024.03.08 至 2024.03.31 00:00-23:59</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">有效期</view>
            <view class="cd-note-content">购买后 7天内(含当日)有效，逾期自动退款</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">使用时间</view>
            <view class="cd-note-content">周一至周日 10:00-21:30</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">使用须知</view>
            <text class="cd-note-content">1、使用本券时请出示券码或二维码至店铺核销使用，即可兑换听渝醪槽冰汤园1份，每单限用1张，不可单独使用;\n2、本券请在每周三营业时间内到店核销使用，逾期无效，仅限堂食，不可外卖，本券不可兑现，不与其他优惠同享，数量有限，先到先得;活动期间每人仅限使用1次\n3、本券可用商户为：4F 听渝\n4、具体活动详情详见店堂公告</text>
          </view>
        </view-->
      </view>
      <view class="cd-i3" v-if="detail.notice">
        <view class="cd-legend">购买须知</view>
        <view class="cd-notes">
          <mp-html :content="detail.notice"></mp-html>
        </view>
        <!--view class="cd-notes">
          <view class="cd-note">
            <view class="cd-note-label">使用场景</view>
            <view class="cd-note-content">到店核销 (单次可核销1张)</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">会员专享</view>
            <view class="cd-note-content">会员专享</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">购买限制</view>
            <view class="cd-note-content">每人每天限购1张，总限购1张</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">限购时间</view>
            <view class="cd-note-content">2024.03.08 至 2024.03.31 00:00-23:59</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">有效期</view>
            <view class="cd-note-content">购买后 7天内(含当日)有效，逾期自动退款</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">使用时间</view>
            <view class="cd-note-content">周一至周日 10:00-21:30</view>
          </view>
          <view class="cd-note">
            <view class="cd-note-label">使用须知</view>
            <text class="cd-note-content">1、使用本券时请出示券码或二维码至店铺核销使用，即可兑换听渝醪槽冰汤园1份，每单限用1张，不可单独使用;\n2、本券请在每周三营业时间内到店核销使用，逾期无效，仅限堂食，不可外卖，本券不可兑现，不与其他优惠同享，数量有限，先到先得;活动期间每人仅限使用1次\n3、本券可用商户为：4F 听渝\n4、具体活动详情详见店堂公告</text>
          </view>
        </view-->
      </view>
      <view class="cd-blank"></view>
      <view class="cd-tabbar" :class="{ 'is_iPhoneX' : is_iPhoneX }">
        <view class="cd-tabbar-placeholder"></view>
        <view class="cd-tabbar-inner">
          <view class="cd-tabbar-b1">
            <view class="cd-tabbar-num"><span class="cd-tabbar-n1">{{ detail.cost_score }}</span>积分</view>
            <view class="cd-tabbar-opt">
              <view class="cd-tabbar-opt-label">数量</view>
              <cdTabbarNum v-model="num" :stock="detail.stock"></cdTabbarNum>
            </view>
          </view>
          <view class="cd-tabbar-b2">
            <view class="cd-tabbar-btn" @tap="onSubmit" v-if="detail.stock > 0">我要兑换</view>
            <view class="cd-tabbar-btn disabled" v-if="detail.stock == 0">库存不足</view>
          </view>
        </view>
      </view>
    </block>
    <creditExchangeDialog ref="c-creditExchangeDialog" @ok="onOk" :num="total"></creditExchangeDialog>
  </view>
</template>
<script>
import cdTabbarNum from '../components/cdTabbarNum.vue'
import creditExchangeDialog from '../components/creditExchangeDialog.vue'
export default {
  components : {
    cdTabbarNum,
    creditExchangeDialog
  },
  data() {
    return {
      title : `积分换礼`,
      is_iPhoneX : this.$store.getters.is_iPhoneX,
      detail : {},
      num : 1,
      isLoad : false,
    }
  },
  computed : {
    total(){
      return this.detail.cost_score * this.num;
    }
  },
  onLoad(options) {
    this.id = options.scene;
    this.init();
  },
  methods: {
    init(){
      this.$api.productDetail({
        id : this.id
      }).then(res => {
        this.detail = res;
        this.isLoad = true;
      })
    },
    onSubmit(){
      this.$store.dispatch('checkLogin').then(res => {
        let c = this.$refs['c-creditExchangeDialog'];
        c.show();
      })
    },
    onOk(){
      this.$api.productExchange({
        id : this.id,
        count : this.num
      }).then(res => {
        this.init();
        this.$store.dispatch('requestSubscribeMessage',{
          id : this.id,
          type : 2
        }).then(res => {
          this.$store.dispatch('getUserInfo',false);
          this.$Router.push({
            name : "credit.confirm"
          })
        })
      }).catch(err => {
        this.init();
      })
    },
    onShare(){
      return {
        title : this.detail.name,
        imageUrl : this.imageFormat(this.detail.cover,500,400)
      }
    },
    onCall(){
      this.$tool.makePhoneCall(this.detail.shop.phone);
    }
  },
  onShareAppMessage(){
    return this.onShare();
  },
  onShareTimeline(){
    return this.onShare();
  }
}
</script>
