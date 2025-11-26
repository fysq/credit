<template>
  <view class="imShop">
    <view class="is-list">
      <view class="is-item" v-for="(item,index) in list" :key="index" @tap="onDetail" :data-item="item">
        <view class="is-pic">
          <view class="is-img">
            <image :src="imageFormat(item.logo,250,250)" class="blockImg"></image>
          </view>
        </view>
        <view class="is-info">
          <view class="is-name">{{ item.name }}</view>
          <view class="is-address">{{ item.address }}</view>
        </view>
      </view>
      <!--view class="is-item">
        <view class="is-pic">
          <view class="is-img">
            <image src="http://dummyimage.com/250x250" class="blockImg"></image>
          </view>
        </view>
        <view class="is-info">
          <view class="is-name">香德亨（常州新本万达点）</view>
          <view class="is-address">3F-3035-2</view>
        </view>
      </view>
      <view class="is-item">
        <view class="is-pic">
          <view class="is-img">
            <image src="http://dummyimage.com/250x250" class="blockImg"></image>
          </view>
        </view>
        <view class="is-info">
          <view class="is-name">香德亨（常州新本万达点）</view>
          <view class="is-address">3F-3035-2</view>
        </view>
      </view>
      <view class="is-item">
        <view class="is-pic">
          <view class="is-img">
            <image src="http://dummyimage.com/250x250" class="blockImg"></image>
          </view>
        </view>
        <view class="is-info">
          <view class="is-name">香德亨（常州新本万达点）</view>
          <view class="is-address">3F-3035-2</view>
        </view>
      </view>
      <view class="is-item">
        <view class="is-pic">
          <view class="is-img">
            <image src="http://dummyimage.com/250x250" class="blockImg"></image>
          </view>
        </view>
        <view class="is-info">
          <view class="is-name">香德亨（常州新本万达点）</view>
          <view class="is-address">3F-3035-2</view>
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
        name : 'shop.detail',
        params : {
          scene : id
        }
      })
    }
  }
}
</script>
