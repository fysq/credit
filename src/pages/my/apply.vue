<template>
  <view class="myApply">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="ma-inner">
      <view class="ma-title">请完善以下信息用于申请开通会员</view>
      <view class="ma-elem">
        <view class="ma-label">手机号</view>
        <view class="ma-opt">
          <view class="ma-value readonly">{{ phoneFormat }}</view>
        </view>
      </view>
      <view class="ma-elem">
        <view class="ma-label">性别</view>
        <view class="ma-opt">
          <picker mode="selector" :range="gender" range-key="name" @change="onPicker" data-name="form.gender">
            <view class="ma-value ma-picker" :class="{ 'unset2' : !form.gender }">{{ form.genderFormat }}</view>
          </picker>
        </view>
      </view>
      <view class="ma-elem">
        <view class="ma-label">生日</view>
        <view class="ma-opt">
          <picker mode="date" @change="onPicker" data-name="form.birthday">
            <view class="ma-value ma-picker" :class="{ 'unset2' : !form.birthday }">{{ form.birthday }}</view>
          </picker>
        </view>
      </view>
      <view class="ma-elem">
        <view class="ma-label">姓名</view>
        <view class="ma-opt">
          <view class="ma-input">
            <input type="text" v-model="form.name" placeholder="请输入姓名" placeholder-style="color:#cacace"/>
          </view>
        </view>
      </view>
    </view>
    <view class="ma-b2" :class="{ 'is_iPhoneX' : is_iPhoneX }">
      <view class="ma-btn commonBtn" @tap="onSubmit">确定提交</view>
    </view>
  </view>
</template>
<script>
import mixinfo from './mixinfo.vue'
export default {
  mixins : [mixinfo],
  data() {
    return {
      title : `申请会员信息`,
      is_iPhoneX : this.$tool.is_iPhoneX(),
    }
  },
  onLoad() {
  },
  methods: {
    submitApi(form){
      return this.$store.dispatch('updateUserInfoDetail',form);
    }
  }
}
</script>
