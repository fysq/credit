<template>
  <view class="myInfo">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="mi-b1">
      <view class="mi-elem">
        <view class="mi-label">头像昵称</view>
        <view class="mi-opt">
          <view class="mi-value mi-wx" @tap="onChangeUserInfo">
            <view class="mi-wx-ava" v-if="user.avatarUrl">
              <image :src="user.avatarUrl" class="blockImg"></image>
            </view>
            <view class="mi-wx-nickname" v-if="user.nickName">{{ user.nickName }}</view>
            <view class="mi-wx-nickname unset" v-else>未设置</view>
          </view>
        </view>
      </view>
      <view class="mi-elem">
        <view class="mi-label">手机号</view>
        <view class="mi-opt">
          <view class="mi-value">{{ user.phone }}</view>
        </view>
      </view>
    </view>
    <view class="mi-b2">
      <view class="mi-t1">请完善以下信息用于申请开通会员</view>
      <view class="mi-elem">
        <view class="mi-label required">姓名</view>
        <view class="mi-opt">
          <view class="mi-input">
            <input type="text" v-model="form.name" placeholder="未设置" placeholder-style="color:#cacace"/>
          </view>
        </view>
      </view>
      <view class="mi-elem">
        <view class="mi-label required">性别</view>
        <view class="mi-opt">
          <picker mode="selector" :range="gender" range-key="name" @change="onPicker" data-name="form.gender">
            <view class="mi-picker" :class="{ unset : !form.gender }">{{ form.genderFormat }}</view>
          </picker>
        </view>
      </view>
      <view class="mi-elem">
        <view class="mi-label required">出生年月</view>
        <view class="mi-opt">
          <picker mode="date" @change="onPicker" data-name="form.birthday">
            <view class="mi-picker" :class="{ unset : !form.birthday }">{{ form.birthday }}</view>
          </picker>
        </view>
      </view>
    </view>
    <view class="mi-tip">温警提示:重新修改信息后，需要重新审核通过后才能成为会员</view>
    <view class="mi-btn commonBtn" @tap="onSubmit" v-if="formChange">确定修改</view>
    <view class="mi-b3" :class="{ 'is_iPhoneX' : is_iPhoneX }">
      <view class="mi-phone">切换手机号<button @getphonenumber="onGetPhone" open-type="getPhoneNumber" class="mi-phone-btn"></button></view>
    </view>
    <myInfoDialog ref="c-myInfoDialog" v-model="user" @input="onUserEdit"></myInfoDialog>
  </view>
</template>
<script>
import mixinfo from './mixinfo.vue'
import myInfoDialog from '../components/myInfoDialog.vue'
export default {
  mixins : [mixinfo],
  components : {
    myInfoDialog
  },
  data() {
    return {
      title : `个人资料`,
      is_iPhoneX : this.$store.getters.is_iPhoneX,
    }
  },
  onLoad() {

  },
  methods: {
    onChangeUserInfo(){
      this.$refs['c-myInfoDialog'].show();
    },
    onUserEdit(){
      this.$store.dispatch('updateUserInfoBasic',{
        nick_name : this.user.nickName,
        phone : this.user.phone,
        avatar_url : this.user.avatarUrl
      });
    },
    onGetPhone(e){
      if(e.detail.iv){
        this.$store.dispatch('decryptPhone',e).then(res => {
          this.user.phone = res.phoneNumber;
        })
      }
    },
    submitApi(form){
      return this.$store.dispatch('updateUserInfoDetail',form);
    }
  }
}
</script>
