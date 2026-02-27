<template>
  <view class="im-swiper imSwiper">
    <swiper @change="onChange" :circular="true" :autoplay="true">
      <swiper-item v-for="(item, index) in list" :key="index">
        <view class="is-img" @tap="onLink" :data-item="item">
          <image mode="aspectFill" :src="imageFormat(item.img, 750, 700)" class="blockImg"></image>
        </view>
      </swiper-item>
      <!--swiper-item>
        <view class="is-img">
          <image src="https://dummyimage.com/750x400" class="blockImg"></image>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="is-img">
          <image src="https://dummyimage.com/750x400" class="blockImg"></image>
        </view>
      </swiper-item-->
    </swiper>
    <view class="is-dots" v-if="list.length > 1" :class="{ 'i2': isLogin == 2 }">
      <view class="is-dot" v-for="(item, index) in list" :key="index" :class="{ 'on': index == state.index }"></view>
      <!--view class="is-dot"></view>
      <view class="is-dot"></view-->
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: {
      default: []
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  data() {
    return {
      state: {
        index: 0,
      }
    }
  },
  mounted() {
    let ids = this.list.map(res => {
      return res.id
    });
    if (ids.length) {
      this.$api.adView({
        ids
      });
    }
  },
  methods: {
    onChange(e) {
      this.state.index = e.detail.current;
    },
    onLink(e) {
      const { item } = e.currentTarget.dataset;
      this.$api.adHit({
        id: item.id
      })
      this.$Router.customLink(item.link_obj);
    }
  }
}
</script>
