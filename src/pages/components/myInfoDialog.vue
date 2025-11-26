<template>
<view class="myInfoDialog" v-if="isshow">
  <view class="mid-inner animated fadeInUp" :class="{ 'is_iPhoneX' : is_iPhoneX }">
    <view class="mid-close" @tap="hide"></view>
    <view class="mid-title">编辑头像和昵称</view>
    <view class="mid-ava" @tap="onUpload">
      <image :src="user.avatarUrl" class="blockImg" v-if="user.avatarUrl"></image>
      <image :src="defaultAva" class="blockImg" v-else></image>
    </view>
    <view class="mid-nickname">
      <input type="nickname" placeholder="请输入微信昵称" v-model="user.nickName"/>
    </view>
    <view class="mid-btn" @tap="onSave">保存</view>
  </view>
</view>
</template>
<script>
import Upload from '@/utils/Upload.class.js'
export default {
  props : ['value'],
  data() {
    return {
      isshow : false,
      defaultAva : this.$store.state.defaultAva,
      is_iPhoneX : this.$store.getters.is_iPhoneX,
      user : {},
    }
  },
  mounted() {
    this.up = Upload.getInstance();
  },
  methods: {
    onUpload(){
      this.up.chooseImage({
        limit : 1
      }).subscribe(res => {
        this.user.avatarUrl = res.imageURL;
      })
    },
    show(){
      this.user = Object.assign({},this.value);
      this.isshow = true;
    },
    hide(){
      this.isshow = false;
    },
    onSave(){
      this.$emit('input',this.user);
      this.hide();
    }
  }
}
</script>
