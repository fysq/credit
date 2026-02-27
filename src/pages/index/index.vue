<template>
  <view class="indexMod">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx"
      rightWidth="174rpx" :tabPage="true" />
    <block v-if="isLoad">
      <view class="im-swiper">
        <imSwiper :list="state.ad.index_swiper"></imSwiper>
      </view>
      <view class="im-menus imMenus">
        <view class="im-b1" @tap="onApply" :class="{ 'show': isLogin == 1 || isLogin == 0 }"></view>
        <view class="im-b2">
          <view class="im-item" @tap="onShop">
            <view class="im-icon i1"></view>
            <view class="im-name">优质商家</view>
          </view>
          <view class="im-item" @tap="onCredit">
            <view class="im-icon i2"></view>
            <view class="im-name">积分兑换</view>
          </view>
          <view class="im-item" @tap="onProduct">
            <view class="im-icon i5"></view>
            <view class="im-name">优惠折扣</view>
          </view>
          <view class="im-item" @tap="onAct">
            <view class="im-icon i3"></view>
            <view class="im-name">活动报名</view>
          </view>
          <view class="im-item" @tap="onMy">
            <view class="im-icon i4"></view>
            <view class="im-name">会员中心</view>
          </view>
        </view>
      </view>
      <view class="im-activity imActivity" v-if="state.activity.length">
        <view class="ia-title commonTitle ct">
          <view class="ct-name">热门活动</view>
          <view class="ct-more" @tap="onAct">查看更多</view>
        </view>
        <imActivity :list="state.activity"></imActivity>
      </view>
      <view class="im-shop imShop" v-if="state.shop.length">
        <view class="is-title commonTitle ct">
          <view class="ct-name">优质商家</view>
          <view class="ct-more" @tap="onShop">查看更多</view>
        </view>
        <imShop :list="state.shop"></imShop>
      </view>
      <view class="im-product imProduct" v-if="state.discount.length">
        <view class="ic-title commonTitle ct">
          <view class="ct-name">优惠折扣</view>
          <view class="ct-more" @tap="onProduct">查看更多</view>
        </view>
        <imProduct :list="state.discount"></imProduct>
      </view>
      <view class="im-credit imCredit" v-if="state.product.length">
        <view class="ic-title commonTitle ct">
          <view class="ct-name">积分兑换</view>
          <view class="ct-more" @tap="onCredit">查看更多</view>
        </view>
        <imCredit :list="state.product"></imCredit>
      </view>
      <imAd ref="c-imAd" :ad="state.ad.index_open"></imAd>
    </block>
    <tabbar></tabbar>
  </view>
</template>
<script>
import imSwiper from '../components/imSwiper.vue'
import imAd from '../components/imAd.vue'
import imActivity from '../components/imActivity.vue'
import imCredit from '../components/imCredit.vue'
import imShop from '../components/imShop.vue'
import imProduct from '../components/imProduct.vue'
export default {
  components: {
    imSwiper,
    imShop,
    imCredit,
    imActivity,
    imProduct,
    imAd
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  data() {
    return {
      title: '',
      state: {},
      config: {},
      isLoad: false,
    }
  },
  onLoad() {
    /*
    let c = this.$refs['c-imAd'];
    c.show();
    */


    this.$store.dispatch('getConfig').then(res => {
      this.config = res;
      this.title = res.site_name;
    })
    this.$api.index().then(res => {
      this.state = res;
      this.isLoad = true;
    })
  },
  methods: {
    onShare() {
      let { config } = this;
      return {
        title: config.share_title,
        imageUrl: this.imageFormat(config.share_cover, 500, 400),
      }
    },
    onShop() {
      this.$Router.pushTab({
        name: 'shop'
      })
      this.$ev.delayEmit('shop.index', {
        a: 1,
        b: 2
      });
    },
    onCredit() {
      this.$Router.push({
        name: "credit"
      })
    },
    onProduct() {
      this.$Router.push({
        name: 'product'
      })
    },
    onAct() {
      this.$Router.pushTab({
        name: "act",
      })
    },
    onApply() {
      this.$Router.push({
        name: 'my.apply'
      });
    },
    onMy() {
      this.$Router.pushTab({
        name: "my",
      })
    },
  },
  onShareAppMessage() {
    return this.onShare();
  },
  onShareTimeline() {
    return this.onShare();
  }
}
</script>
<style></style>
