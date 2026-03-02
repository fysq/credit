<template>
  <view class="activityDetail">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx"
      rightWidth="174rpx" />
    <block v-if="isLoad">
      <view class="ad-info activityDetailInfo">
        <view class="adi-tag">
          <commonTag :progress="state.progress"></commonTag>
        </view>
        <view class="adi-pic">
          <image :src="imageFormat(state.cover, 690, 270)" class="blockImg"></image>
        </view>
        <view class="adi-info">
          <view class="adi-share">
            <button open-type="share" class="adi-share-btn"></button>
          </view>
          <view class="adi-n1">{{ state.title }}</view>
          <view class="adi-n2 adi-row"><span class="adi-label">报名时间</span><span class="adi-value">{{
            timeRange(state.sign_start_time, state.sign_end_time) }}</span></view>
          <view class="adi-n2 adi-row"><span class="adi-label">活动时间</span><span class="adi-value">{{
            timeRange(state.start_time, state.end_time) }}</span></view>
          <view class="adi-n2 adi-row"><span class="adi-label">活动地址</span><span class="adi-value">{{ state.address
              }}</span></view>
          <view class="adi-n2 adi-row" v-if="state.notice"><span class="ad-rule-label">温馨提醒</span><span
              class="adi-value">{{
                state.notice }}</span></view>
          <view class="adi-n3">
            <view class="adi-p1">参与人数</view>
            <view class="adi-ps">
              <view class="adi-user" :class="{ 'isdefault': !item }" v-for="(item, index) in state.join_user_icon_arr"
                :key="index">
                <image :src="item" class="blockImg"></image>
              </view>
              <!--view class="adi-user">
                <image src="http://dummyimage.com/46x46" class="blockImg"></image>
              </view>
              <view class="adi-user isdefault"></view>
              <view class="adi-user">
                <image src="http://dummyimage.com/46x46" class="blockImg"></image>
              </view>
              <view class="adi-user">
                <image src="http://dummyimage.com/46x46" class="blockImg"></image>
              </view-->
            </view>
            <view class="adi-pnum" v-if="isVerifyer" @tap="onAdmin"><span class="adi-pem">{{ state.join_num
                }}</span>人已参与</view>
            <view class="adi-pnum" v-else><span class="adi-pem">{{ state.join_num }}</span>人已参与</view>

          </view>
        </view>
      </view>
      <view class="ad-editor">
        <view class="ad-editor-title">活动详情</view>
        <mp-html :content="state.content"></mp-html>
        <!--view class="ad-editor-pic" @tap="onPreview">
          <image src="http://dummyimage.com/650x430" class="blockImg"></image>
        </view>
        <view class="ad-rule2">
          <view class="ad-rule2-title">活动细则</view>
          <view class="ad-rule2-rows">
            <view class="ad-rule2-row">1、使用本券时请出示券码或二维码至现场工作人员处核销</view>
            <view class="ad-rule2-row">2、本次活动每人仅限报名一次;</view>
            <view class="ad-rule2-row">3、本券不可转增、不找雪、不兑现、逾期作废不补发，活动图片仅供参考，以实物为准</view>
            <view class="ad-rule2-row">4、报名时间：2024年1月13日-1月20日 活动时间：2024年1月21日13:30</view>
            <view class="ad-rule2-row">5、活动地点：钟楼区延陵西路123号常州吾悦广场A座 2F 连廊（JNBY旁）</view>
          </view>
        </view-->
      </view>

      <view class="ad-blank"></view>
      <view class="ad-tabbar" :class="{ 'is_iPhoneX': is_iPhoneX }">
        <view class="ad-tabbar-inner">
          <view class="ad-tabbar-b1">
            <view class="ad-tabbar-c1">
              <view class="ad-tabbar-num"><span class="ad-tabbar-n1">{{ state.score }}</span>积分</view>
            </view>
            <view class="ad-tabbar-c2">成功核销后</view>
          </view>
          <view class="ad-tabbar-b2">
            <view class="ad-tabbar-btn" @tap="onSubmit">我要报名</view>
          </view>
        </view>
      </view>

      <view class="custom-form-modal" v-if="showCustomForm">
        <view class="cfm-bg" @tap="showCustomForm = false"></view>
        <view class="cfm-content">
          <view class="cfm-title">请填写报名信息</view>
          <scroll-view scroll-y class="cfm-body">
            <view class="cfm-item" v-for="(item, index) in state.custom_form" :key="index">
              <view class="cfm-label">{{ item.label }}<text v-if="item.required" class="cfm-req">*</text></view>
              <input class="cfm-input" v-if="item.type == 'text'" v-model="formData[index]" placeholder="请输入" />
              <radio-group class="cfm-radio-group" v-if="item.type == 'radio'" @change="onRadioChange($event, index)">
                <label class="cfm-radio" v-for="(opt, oIndex) in item.options" :key="oIndex">
                  <radio :value="opt.name ? opt.name : opt" :checked="formData[index] === (opt.name ? opt.name : opt)"
                    :disabled="opt.limit > 0 && opt.count >= opt.limit" style="flex-shrink: 0;" />
                  <view style="flex: 1;">{{ opt.name ? opt.name : opt }}</view>
                  <text v-if="opt.limit > 0"
                    style="color: #999; font-size: 24rpx; margin-left: 10rpx; white-space: nowrap; flex-shrink: 0;">({{
                      opt.count >= opt.limit ? '已满' : '剩'
                        + (opt.limit - opt.count) + '个' }})</text>
                </label>
              </radio-group>
              <checkbox-group class="cfm-checkbox-group" v-if="item.type == 'checkbox'"
                @change="onCheckboxChange($event, index)">
                <label class="cfm-checkbox" v-for="(opt, oIndex) in item.options" :key="oIndex">
                  <checkbox :value="opt.name ? opt.name : opt"
                    :checked="(formData[index] || []).includes(opt.name ? opt.name : opt)"
                    :disabled="opt.limit > 0 && opt.count >= opt.limit" style="flex-shrink: 0;" />
                  <view style="flex: 1;">{{ opt.name ? opt.name : opt }}</view>
                  <text v-if="opt.limit > 0"
                    style="color: #999; font-size: 24rpx; margin-left: 10rpx; white-space: nowrap; flex-shrink: 0;">({{
                      opt.count >= opt.limit ? '已满' : '剩'
                        + (opt.limit - opt.count) + '个' }})</text>
                </label>
              </checkbox-group>
            </view>
          </scroll-view>
          <view class="cfm-footer">
            <view class="cfm-btn cancel" @tap="showCustomForm = false">取消</view>
            <view class="cfm-btn submit" @tap="submitCustomForm">确定</view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>
<style>
.admin-float-btn {
  position: fixed;
  right: 30rpx;
  bottom: 180rpx;
  width: 120rpx;
  height: 120rpx;
  background: #f26622;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  line-height: 1.2;
  text-align: center;
  box-shadow: 0 4rpx 10rpx rgba(242, 102, 34, 0.4);
  z-index: 99;
}

.custom-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-form-modal .cfm-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.custom-form-modal .cfm-content {
  position: relative;
  width: 620rpx;
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-sizing: border-box;
}

.custom-form-modal .cfm-title {
  font-size: 34rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
  color: #333;
}

.custom-form-modal .cfm-body {
  max-height: 500rpx;
}

.custom-form-modal .cfm-item {
  margin-bottom: 30rpx;
}

.custom-form-modal .cfm-label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 12rpx;
  font-weight: bold;
}

.custom-form-modal .cfm-req {
  color: #f26622;
  margin-left: 8rpx;
}

.custom-form-modal .cfm-input {
  border: 1px solid #e8ebf3;
  height: 70rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  border-radius: 8rpx;
  width: 100%;
  box-sizing: border-box;
}

.custom-form-modal .cfm-radio-group,
.custom-form-modal .cfm-checkbox-group {
  display: flex;
  flex-direction: column;
}

.custom-form-modal .cfm-radio,
.custom-form-modal .cfm-checkbox {
  margin-bottom: 16rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  color: #555;
}

.custom-form-modal .cfm-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
}

.custom-form-modal .cfm-btn {
  width: 46%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border-radius: 40rpx;
  font-size: 30rpx;
}

.custom-form-modal .cfm-btn.cancel {
  background: #f5f5f5;
  color: #666;
}

.custom-form-modal .cfm-btn.submit {
  background: #f26622;
  color: #fff;
}
</style>
<script>
export default {
  data() {
    return {
      is_iPhoneX: this.$store.getters.is_iPhoneX,
      title: `活动详情`,
      state: {},
      isLoad: false,
      isVerifyer: false,
      showCustomForm: false,
      formData: [],
    }
  },
  onLoad(options) {
    this.id = options.scene;
    this.$api.actDetail({
      id: this.id
    }).then(res => {
      this.state = res;
      this.isLoad = true;
    })
  },
  onShow() {
    if (this.id) {
      this.$store.dispatch('getUserInfo').then(() => {
        this.checkVerify();
      });
    }
  },
  onShareAppMessage() {
    return this.onShare();
  },
  onShareTimeline() {
    return this.onShare();
  },
  methods: {
    checkVerify() {
      if (this.$store.getters.isLogin <= 0) return;
      this.$api.actIsVerifyer({
        id: this.id
      }).then(res => {
        this.isVerifyer = res.isVerifyer == 1;
      }).catch(err => {
        this.isVerifyer = false;
      })
    },
    onAdmin() {
      this.$Router.push({
        path: '/pages/act/admin',
        query: {
          id: this.id
        }
      })
    },
    onShare() {
      this.$api.actShare({
        id: this.id
      });
      return {
        title: this.state.title,
        imageUrl: this.imageFormat(this.state.cover, 500, 400)
      }
    },
    onPreview() {
      uni.previewImage({
        urls: ['http://dummyimage.com/100x100'],
      })
    },
    onSubmit() {
      this.$store.dispatch('checkLogin').then(res => {
        if (this.state.custom_form && this.state.custom_form.length > 0) {
          this.showCustomForm = true;
          this.formData = new Array(this.state.custom_form.length);
        } else {
          this.doSign('');
        }
      });
    },
    onRadioChange(e, index) {
      this.$set(this.formData, index, e.detail.value);
    },
    onCheckboxChange(e, index) {
      this.$set(this.formData, index, e.detail.value);
    },
    submitCustomForm() {
      let submitData = [];
      for (let i = 0; i < this.state.custom_form.length; i++) {
        let item = this.state.custom_form[i];
        let val = this.formData[i];
        if (item.required && (!val || (Array.isArray(val) && val.length == 0))) {
          uni.showToast({ title: `请填写${item.label}`, icon: 'none' });
          return;
        }
        submitData.push({
          label: item.label,
          value: val || ''
        });
      }
      this.doSign(submitData);
      this.showCustomForm = false;
    },
    doSign(form_data) {
      this.$api.actSign({
        activity_id: this.id,
        form_data: form_data
      }).then(res => {
        this.$store.dispatch('requestSubscribeMessage', {
          id: this.id,
          type: 1
        }).then(res => {
          setTimeout(() => {
            this.$Router.push({
              name: 'act.confirm',
              params: {
                id: 0
              }
            })
          }, 1e3);
        })
      }).catch(err => {
        uni.showToast({ title: err.data.msg || err.data.message || '报名失败1', icon: 'none' });
      });
    }
  }
}
</script>