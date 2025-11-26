<template>
  <view class="myExchangeDetail">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="med-inner" v-if="isLoad">
      <view class="med-b1 medInfo">
        <view class="mi-hd">
          <view class="mi-title">{{ detail.product.name }}</view>
          <view class="mi-price">市场价￥<span class="mi-price-em">{{ detail.product.origin_price }}</span></view>
        </view>
        <view class="mi-bd">
          <view class="mi-t1">活动核销码</view>
          <view class="mi-t2">
            <view class="mi-code" :class="['s' + detail.verify_status ]">
              <image :src="code" class="blockImg" show-menu-by-longpress="true"></image>
            </view>
          </view>
          <view class="mi-num">兑换数量：{{ detail.count }}份</view>
          <view class="mi-t3">凭核销码联系现场工作人员进行核销</view>
        </view>
      </view>
      <view class="med-b2 medShop">
        <view class="med-title med-b2-title">适用商户</view>
        <view class="ms-item" @tap="onShop">
          <view class="ms-pic">
            <image :src="imageFormat(detail.shop.logo,120,120)" class="blockImg"></image>
          </view>
          <view class="ms-info">
            <view class="ms-name">{{ detail.shop.name }}</view>
            <view class="ms-loc" @tap="onLocation">{{ detail.shop.address }}</view>
          </view>
        </view>
      </view>
      <view class="med-b3 medTip">
        <view class="med-title med-b3-title">温馨提示</view>
        <view class="mt-rows">
          <view class="mt-row">
            <view class="mt-label">领取时间</view>
            <view class="mt-value">{{ detail.created }}</view>
          </view>
          <view class="mt-row">
            <view class="mt-label">有效期</view>
            <view class="mt-value">{{ timeRange(detail.product.verify_start_time,detail.product.verify_end_time)}}</view>
          </view>
          <view class="mt-row">
            <view class="mt-label">使用时间</view>
            <view class="mt-value">{{ detail.shop.open_time }}</view>
          </view>
          <view class="mt-row" v-if="detail.product.notice">
            <view class="mt-label">使用须知</view>
            <view class="mt-value">
              <mp-html :content="detail.product.notice"></mp-html>
            </view>
            <!--text class="mt-value">{{ detail.product.notice }}</text-->
            <!--text class="mt-value">1、本券兑换所积分：9积分，每个账号每笔订单限兑1张，数量有限，兑完即止:\n2、本券需注册，登陆亲雪的茶会员兑换使用，在【吾悦广场】小程序兑换后，复制券码，微信搜索【亲雪点单】小程序，点击我的【兑换中心】-输入兑换码进行使用;\n3、使用条件：购买奈雪八香系列产品可享88折优惠，有效期内共可使用1次;\n4、适用门店：仅适用于亲雪吾悦广场指定门店，具体请查看券适用门店:\n5、适用场景：仅限亲雪线下门店出示会员码或【亲雪点单】小程序"自取”使用，不适用于第三方外送服务；\n6、使用规则：次券每单仅可抵扣一次，每单仅限使用一张优惠券，不可叠加使用，不与其他优惠活动共享，不可兑换现金，不设找要，优惠券抵扣金额不子积分，请在有效期内使用;\n7、此券不适用于加料"包装费"保温袋运费\n8、券面图片仅供参考，商品以实物为准；\n9、适用商品明细：霸气香水芝士草莓(500ml)/霸气香水葡萄(500ml)/霸气香水橙子(500ml)/香水茉莉初雪奶茶(500ml)/香水大红袍鲜奶系(500m1)/香水金色山脉珍珠奶茶(500ml)/霸气香水西柚(500m1)/霸气香水柠檬油柑(500ml)。</text-->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title : `我的兑换`,
      code : '',
      isLoad : false,
      detail : {}
    }
  },
  onLoad(options) {
    this.$store.dispatch('getUserInfo').then(res => {
      this.$api.verifyCode({
        id : options.scene,
        type : 2,
      }).then(res => {
        this.code = res.url;
      });
      this.$api.myProductRecordDetail({
        id : options.scene,
      }).then(res => {
        this.detail = res;
        this.isLoad = true;
      })
    })
  },
  methods: {
    onLocation(){},
    onShop(){
      let { id } = this.detail.shop;
      this.$Router.push({
        name : 'shop.detail',
        params : {
          scene : id
        }
      })
    }
  }
}
</script>
