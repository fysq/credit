<template>
  <view class="myIndex">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" @clickLeft1="back" :type="1" leftWidth="174rpx" rightWidth="174rpx" :tabPage="true"/>
    <view class="mi-flex1">
      <block v-if="isLogin != 2">
        <view class="mi-info" v-if="isLogin != 1" @tap="onLogin">
          <view class="mi-ava nologin"></view>
          <view class="mi-b1">
            <view class="mi-name">请点击登录</view>
            <view class="mi-tag">登录更精彩</view>
          </view>
        </view>
        <view class="mi-info" v-if="isLogin == 1" @tap="onInfo">
          <view class="mi-ava">
            <image :src="user.avatarUrl" class="blockImg"></image>
          </view>
          <view class="mi-b1">
            <view class="mi-name s2">{{ user.nickName}}</view>
            <view class="mi-tag" v-if="user.score == 0"><span class="mi-score">暂无</span>积分</view>
            <view class="mi-tag" v-else><span class="mi-score">{{ user.score }}</span>积分</view>
          </view>
        </view>
        <view class="mi-menus">
          <view class="mi-menu i1" @tap="onCredit">
            <view class="mi-text">我的积分</view>
          </view>
          <view class="mi-menu i2" @tap="onAct">
            <view class="mi-text">我的活动</view>
          </view>
          <view class="mi-menu i3" @tap="onExchange">
            <view class="mi-text">我的兑换</view>
          </view>
          <view class="mi-menu i4" @tap="onCreditEarn">
            <view class="mi-text">赚取积分</view>
          </view>
          <view class="mi-menu i5" @tap="onInfo">
            <view class="mi-text">个人资料</view>
          </view>
          <view class="mi-menu i6" @tap="onWelfare">
            <view class="mi-text">会员权益</view>
          </view>
          <view class="mi-menu i7" @tap="onContact">
            <view class="mi-text">联系客服</view>
            <button open-type="contact" class="mi-contact"></button>
          </view>
          <view class="mi-menu i8" @tap="onAbout">
            <view class="mi-text">关于我们</view>
          </view>
        </view>
      </block>
      <block v-if="isLogin == 2">
        <view class="mi-info vip" @tap="onInfo">
          <view class="mi-ava">
            <image :src="user.avatarUrl" class="blockImg"></image>
          </view>
          <view class="mi-b1">
          <view class="mi-name s1">{{ user.nickName }}</view>
            <view class="mi-tag"><span class="mi-score">{{ user.score }}</span>积分</view>
          </view>
        </view>
        <view class="mi-menus">
          <view class="mi-menu i1" @tap="onCredit">
            <view class="mi-text">我的积分</view>
          </view>
          <view class="mi-menu i2" @tap="onAct">
            <view class="mi-text">我的活动</view>
          </view>
          <view class="mi-menu i3" @tap="onExchange">
            <view class="mi-text">我的兑换</view>
          </view>
          <view class="mi-menu i4" @tap="onCreditEarn">
            <view class="mi-text">赚取积分</view>
          </view>
          <view class="mi-menu i5" @tap="onInfo">
            <view class="mi-text">个人资料</view>
          </view>
          <view class="mi-menu i6" @tap="onWelfare">
            <view class="mi-text">会员权益</view>
          </view>
          <view class="mi-menu i7" @tap="onContact">
            <view class="mi-text">联系客服</view>
            <button open-type="contact" class="mi-contact"></button>
          </view>
          <view class="mi-menu i8" @tap="onAbout">
            <view class="mi-text">关于我们</view>
          </view>
        </view>
      </block>
    </view>
    <tabbar placeholderStyle="background:#ffffff"></tabbar>
  </view>
</template>
<script>
export default {
  data() {
    return {
      title : `我的`,
      state : {
      },
      isLoad : false,
    }
  },
  computed : {
    'user' : function() {
      return this.$store.state.userInfo;
    },
    'isLogin' : function() {
      let flag = this.$store.getters.isLogin;
      return flag;
    }
  },
  onLoad() {
    this.$store.dispatch('getUserInfo').then(res => {
      this.isLoad = true;
    });
  },
  methods: {
    onCredit(){
      this.$store.dispatch('checkApply').then(res => {
        this.$Router.push({
          name : 'my.credit'
        })
      })
    },
    onAct(){
      this.$store.dispatch('checkApply').then(res => {
        this.$Router.push({
          name : 'my.act'
        })
      })
    },
    onExchange(){
      this.$store.dispatch('checkApply').then(res => {
        this.$Router.push({
          name : 'my.exchange'
        })
      })
    },
    onCreditEarn(){
      this.$store.dispatch('checkApply').then(res => {
        this.$Router.push({
          name : 'my.creditearn'
        })
      })
    },
    onInfo(){
      this.$store.dispatch('checkLogin').then(res => {
        this.$Router.push({
          name : 'my.info'
        })
      })
    },
    onWelfare(){
      this.$Router.push({
        name : 'my.welfare'
      })
    },
    onContact(){
    
    },
    onAbout(){
      this.$Router.push({
        name : 'my.about'
      })
    },
    onLogin(){
      this.$Router.push({
        name : 'my.login'
      })
    }
  }
}
</script>
