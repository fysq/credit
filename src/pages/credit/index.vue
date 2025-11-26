<template>
  <view class="creditIndex">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="ci-inner">
      <view class="ci-info" v-if="isLogin >= 1">
      <view class="ci-b1">我的积分 {{ user.score }}</view>
        <view class="ci-b2"></view>
      </view>
      <view class="ci-info" v-if="isLogin < 1" @tap="onLogin">
        <view class="ci-b1">我的积分</view>
        <view class="ci-b2">请登录后查看</view>
      </view>
      <view class="j-scroll-tab">
        <view class="ci-tabs" :style="tabScroll.topStyle" :class="{ 'tabFix' : tabScroll.tabFix }">
          <view class="ci-tab" :class="{ 'on' : tabIndex == item.value }" v-for="(item,index) in tabs" :key="index" @tap="onTab" :data-index="item.value">{{ item.name }}</view>
        </view>
        <view class="ci-list" v-if="state.list.length > 0">
          <imCredit :list="state.list"></imCredit>
        </view>
        <empty v-if="state.list.length == 0 && state.islock"></empty>
      </view>
    </view>
  </view>
</template>
<script>
import imCredit from '../components/imCredit.vue'
import commonList from '../mix/commonList.vue'
import tabScroll from '../mix/tabScroll.vue'
export default {
  mixins : [commonList,tabScroll],
  components : {
    imCredit
  },
  data() {
    return {
      title : `积分换礼`,
      tabs : [{
        name : '全部礼品',
        value : '',
      },{
        name : '我能兑换',
        value : 1
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
      return this.$api.productListLoad(params);
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
