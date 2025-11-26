<template>
  <view class="myExchange">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="me-list" v-if="state.list.length > 0">
      <view class="me-item" @tap="onDetail" :data-item="item" v-for="(item,index) in state.list" :key="item.id">
        <view class="me-hd">
          <view class="me-time">获取时间 {{ item.created }}</view>
          <view class="me-status" :class="['s' + item.verify_status]">{{ item.verify_name }}</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image :src="imageFormat(item.product.cover,120,120)" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">{{ item.product.name }}</view>
            <view class="me-expire">有效期：{{ timeRange(item.product.verify_start_time,item.product.verify_end_time)}}</view>
          </view>
        </view>
      </view>
      <!--view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view>
      <view class="me-item">
        <view class="me-hd">
          <view class="me-time">获取时间 2024-03-22 11:20:41</view>
          <view class="me-status s1">未核销</view>
        </view>
        <view class="me-bd">
          <view class="me-pic">
            <image src="http://dummyimage.com/120x120" class="blockImg"></image>
          </view>
          <view class="me-info">
            <view class="me-title">奈雪88折优惠券</view>
            <view class="me-expire">有效期：2024-03-25 至 2024-05-07</view>
          </view>
        </view>
      </view-->
    </view>
    <empty v-if="state.list.length == 0 && state.islock"></empty>
  </view>
</template>
<script>
import commonList from '../mix/commonList.vue'
export default {
  mixins : [commonList],
  data() {
    return {
      title : `我的兑换`
    }
  },
  onLoad() {
    this.$store.dispatch('getUserInfo').then(res => {
      this.reset();
    })
  },
  methods: {
    commonListApi(){
      return this.$api.myProductRecordLoad();
    },
    onDetail(e){
      const { item } = e.currentTarget.dataset;
      this.$Router.push({
        name : 'my.exchange.detail',
        params : {
          scene : item.id,
        }
      })
    }
  }
}
</script>
