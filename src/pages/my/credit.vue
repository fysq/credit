<template>
  <view class="myCredit">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="mc-inner">
      <view class="mc-b1">
        <view class="mc-r1">
          <view class="mc-c1">当前积分</view>
          <view class="mc-c2" @tap="onRule">积分规则</view>
        </view>
        <view class="mc-r2">
          <view class="mc-num">{{ user.score }}</view>
          <view class="mc-btns">
            <view class="mc-btn" @tap="onEarn">赚取积分</view>
            <view class="mc-btn" @tap="onExchange">去兑礼</view>
          </view>
        </view>
      </view>
      <view class="mc-b2 j-scroll-tab">
        <view class="mc-tabs" :style="tabScroll.topStyle" :class="{ 'tabFix' : tabScroll.tabFix }">
          <view class="mc-tab" :class="{ 'on' : item.value == tabIndex }" v-for="(item,index) in tabs" @tap="onTab" :data-index="item.value" :key="index">{{ item.name }}</view>
          <!--view class="mc-tab">获取</view>
          <view class="mc-tab">使用</view-->
        </view>
        <view class="mc-list">
          <view class="mc-item" v-for="(item,index) in state.list" :key="item.id">
            <view class="mc-i1">
              <view class="mc-t1">{{ item.change_reason }}</view>
              <!--view class="mc-t2">粉雪小镇打卡活动</view-->
            </view>
            <view class="mc-i2">
              <view class="mc-score" :class="{ 'minus' : item.type == 2,'add' : item.type == 1 }">{{ item.change_score }}</view>
              <view class="mc-time">{{ item.created }}</view>
            </view>
          </view>
          <!--view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view>
          <view class="mc-item">
            <view class="mc-i1">
              <view class="mc-t1">注册有礼</view>
            </view>
            <view class="mc-i2">
              <view class="mc-score add">400</view>
              <view class="mc-time">2024-03-22 11:20:41</view>
            </view>
          </view-->
        </view>
        <empty v-if="state.list.length == 0 && state.islock"></empty>
      </view>
    </view>
  </view>
</template>
<script>
import commonList from '../mix/commonList.vue'
import tabScroll from '../mix/tabScroll.vue'
export default {
  mixins : [commonList,tabScroll],
  computed : {
    user(){
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {
      title : `我的积分`,
      tabs : [{
        name : '全部',
        value : ''
      },{
        name : '获取',
        value : 1
      },{
        name : '使用',
        value : 2
      }],
      tabIndex : '',
    }
  },
  created(){
  },
  onLoad() {
    this.$store.dispatch('getUserInfo').then(res => {
      this.reset();
    })
  },
  methods: {
    onTab(e){
      let { index } = e.currentTarget.dataset;
      this.tabIndex = index;
      this.scrollToTop();
      this.reset();
    },
    onRule(){
      this.$Router.push({
        name : 'my.creditrule'
      })
    },
    onEarn(){
      this.$Router.push({
        name : 'my.creditearn'
      })
    },
    commonListApi(){
      return this.$api.userScoreLogLoad({
        type : this.tabIndex
      });
    },
    onExchange(){
      this.$Router.push({
        name : 'credit'
      })
    }
  }
}
</script>
