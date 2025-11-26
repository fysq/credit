<template>
<view class="imProduct">
  <view class="ic-list">
    <view class="ic-item" @tap="onDetail" v-for="(item,index) in list" :key="index" :data-item="item">
      <view class="ic-pic">
        <view class="ic-img">
          <image :src="imageFormat(item.cover,250,210)" class="blockImg"></image>
        </view>
      </view>
      <view class="ic-info">
        <view class="ic-name">{{ item.name }}</view>
        <view class="ic-price">
          <span class="ic-p1"><span class="ic-num">{{ item.price }}</span>元</span><span class="ic-p2" v-if="item.origin_price">￥{{ item.origin_price }}</span>
        </view>
      </view>
    </view>
    <!--view class="ic-item">
      <view class="ic-pic">
        <view class="ic-img">
          <image src="http://dummyimage.com/250x210" class="blockImg"></image>
        </view>
      </view>
      <view class="ic-info">
        <view class="ic-name">听雨-苗曹冰汤圆1份</view>
        <view class="ic-price">
          <span class="ic-p1"><span class="ic-num">500</span>积分</span><span class="ic-p2">￥16</span>
        </view>
      </view>
    </view>
    <view class="ic-item">
      <view class="ic-pic">
        <view class="ic-img">
          <image src="http://dummyimage.com/250x210" class="blockImg"></image>
        </view>
      </view>
      <view class="ic-info">
        <view class="ic-name">听雨-苗曹冰汤圆1份</view>
        <view class="ic-price">
          <span class="ic-p1"><span class="ic-num">500</span>积分</span><span class="ic-p2">￥16</span>
        </view>
      </view>
    </view-->
  </view>
</view>
</template>
<script>
export default {
  props : ['list'],
  data() {
    return {
    }
  },
  mounted() {
    
  },
  methods: {
    onDetail(e){
      let { id } = e.currentTarget.dataset.item;
      this.$Router.push({
        name : 'product.detail',
        params : {
          scene : id
        }
      })
    }
  }
}
</script>
