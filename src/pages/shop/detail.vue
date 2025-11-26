<template>
  <view class="shopDetail">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <block v-if="isLoad">
      <view class="sd-info">
        <view class="shopItem">
          <view class="spi-pic">
            <image :src="imageFormat(detail.logo,130,130)" class="blockImg"></image>
          </view>
          <view class="spi-info">
            <view class="spi-share">
              <button class="spi-share-btn" open-type="share"></button>
            </view>
            <view class="spi-n1">{{ detail.name }}</view>
            <view class="spi-n2">营业时间：{{ detail.open_time }}</view>
            <view class="spi-n3" @tap="onLocation" :data-item="detail">商户地址：{{ detail.address }}</view>
          </view>
        </view>
      </view>
      <view class="sd-goods">
        <view class="sd-products" v-if="state.list.length > 0">
          <view class="im-credit imProduct">
            <view class="ic-title commonTitle ct">
              <view class="ct-name">优惠折扣</view>
            </view>
            <imProduct :list="state.list"></imProduct>
          </view>
        </view>
        <view class="sd-credit imCredit" v-if="state.islock && product.list.length > 0">
          <view class="ic-title commonTitle ct">
            <view class="ct-name">积分兑换</view>
            <view class="ct-more" @tap="onCredit">查看更多</view>
          </view>
          <imCredit :list="product.list"></imCredit>
        </view>
      </view>
    </block>
  </view>
</template>
<script>
import imCredit from '../components/imCredit.vue'
import imProduct from '../components/imProduct.vue'
import commonList from '../mix/commonList.vue'
import { deferPromise } from '@/utils/common.esm.js'
export default {
  mixins : [commonList],
  components : {
    imCredit,
    imProduct
  },
  data() {
    return {
      title : `商户详情`,
      detail : {},
      product : {},
      isLoad  : false,
    }
  },
  onLoad() {
    this.id = this.$Route.query.scene;
    this.$api.shopDetail({
      id : this.id
    }).then(res => {
      this.detail = res;
      this.isLoad = true;
      //先加载折扣商品，再加载积分商品
      this.reset().then(res => {
        let p$ = deferPromise();
        if(this.state.islock) p$.resolve();
        this.load$.subscribe(res => {
          if(res.islock){
            p$.resolve();
          }
        })
        p$.then(res => {
          this.load$ = this.commonListApiProduct();
          this.load$.subscribe(res => {
            this.product = res;
          });
          this.load$.load();
        })
      });
    });
  },
  onShareAppMessage(){
    return this.onShare();
  },
  onShareTimeline(){
    return this.onShare();
  },
  methods: {
    onShare(){
      this.$api.shopShare({
        id : this.id
      })
      return {
        title : this.detail.name,
        imageUrl : this.imageFormat(this.detail.logo,500,400)
      }
    },
    commonListApi(){
      return this.$api.discountListLoad({
        shop_id : this.id
      })
    },
    commonListApiProduct(){
      return this.$api.productListLoad({
        shop_id : this.id
      })
    },
    onCredit(){
      this.$Router.push({
        name : 'credit'
      })
    },
    onLocation(){
      uni.openLocation({
        latitude : parseInt(this.detail.lat),
        longitude : parseInt(this.detail.lng),
        name : this.detail.name,
        address : this.detail.address
      })
    }
  }
}
</script>
