<template>
  <view class="discountIndex">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="ci-inner">
      <view class="j-scroll-tab">
        <view class="ci-tabs" :style="tabScroll.topStyle" :class="{ 'tabFix' : tabScroll.tabFix }">
          <view class="ci-tab" :class="{ 'on' : tabIndex == item.value }" v-for="(item,index) in tabs" :key="index" @tap="onTab" :data-index="item.value">{{ item.name }}</view>
        </view>
        <view class="ci-list" v-if="state.list.length > 0">
          <imProduct :list="state.list"></imProduct>
        </view>
        <empty v-if="state.list.length == 0 && state.islock"></empty>
      </view>
    </view>
  </view>
</template>
<script>
import imProduct from '../components/imProduct.vue'
import commonList from '../mix/commonList.vue'
import tabScroll from '../mix/tabScroll.vue'
export default {
  mixins : [commonList,tabScroll],
  components : {
    imProduct
  },
  data() {
    return {
      title : `优惠折扣`,
      tabs : [{
        name : '全部折扣',
        value : '',
      }],
      tabIndex : '',
    }
  },
  computed : {
    isLogin(){
      return this.$store.getters.isLogin;
    },
    user(){
      return this.$store.state.userInfo;
    }
  },
  onLoad() {
    this.tabScroll.tabFixOffsetTop = 25;
    this.reset();
  },
  methods: {
    commonListApi(){
      let params = {};
      if(this.tabIndex == 1){
        params.user_score = this.user.score;
      }
      return this.$api.discountListLoad(params);
    },
    onTab(e){
      let { index } = e.currentTarget.dataset;
      this.tabIndex = index;
      this.reset();
      this.scrollToTop();
    },
    onLogin(){
      this.$Router.push({
        name : 'my.login'
      })
    }
  }
}
</script>
