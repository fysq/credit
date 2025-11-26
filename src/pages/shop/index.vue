<template>
  <view class="shopIndex">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx" :tabPage="true"/>
    <view class="si-search">
      <commonSearch placeholder="请输入商家名称" @confirm="onSearch"></commonSearch>
    </view>
    <view class="si-list">
      <block v-if="state.list.length > 0">
        <view class="si-item" @tap="onDetail" v-for="(item,index) in state.list" :key="item.id" :data-item="item">
          <view class="si-pic">
            <image :src="imageFormat(item.logo,130,130)" class="blockImg"></image>
          </view>
          <view class="si-info">
            <view class="si-n1">{{ item.name }}</view>
            <view class="si-n2">{{ item.address }}</view>
            <view class="si-n3" v-if="item.product_count > 0"><span class="si-tag">兑换</span>有{{ item.product_count }}个积分兑换商品</view>
            <view class="si-n4" v-if="item.discount_count > 0"><span class="si-tag i2">优惠</span>有{{ item.discount_count }}个优惠折扣商品</view>
          </view>
        </view>
      </block>
      <empty v-if="state.list.length == 0 && state.islock"></empty>
      <!--view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view>
      <view class="si-item">
        <view class="si-pic">
          <image src="http://dummyimage.com/130x130" class="blockImg"></image>
        </view>
        <view class="si-info">
          <view class="si-n1">香德亨（常州新北万达店）</view>
          <view class="si-n2">常州新北万达广场 3F-3035-2</view>
          <view class="si-n3"><span class="si-tag">兑换</span>有1个积分兑换商品</view>
        </view>
      </view-->
    </view>
    <tabbar></tabbar>
  </view>
</template>
<script>
import commonList from '../mix/commonList.vue'
export default {
  mixins : [commonList],
  data() {
    return {
      title : `优质商家`,
      kw : ''
    }
  },
  onLoad() {
    this.$ev.delayOn('shop.index',this.evtHandler)
    this.reset();
  },
  methods: {
    evtHandler(res){
      console.log(this);
      console.log(res);
    },
    onDetail(e){
      let { id } = e.currentTarget.dataset.item;
      this.$Router.push({
        name : 'shop.detail',
        params : {
          scene : id
        }
      })
    },
    commonListApi(){
      return this.$api.shopListLoad({
        kw : this.kw
      });
    },
    onSearch(e){
      this.kw = e.kw;
      this.reset();
    }
  },
  destroyed(){
    this.$ev.off('shop.index',this.evtHandler);
  }
}
</script>
