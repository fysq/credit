<template>
  <view class="imAd" v-if="isshow" :class="{ 'vn' : !imgshow }">
    <view class="ia-inner" :class="{ 'animated fadeIn' : imgshow }">
      <view class="ia-pic" @tap="onDetail">
        <image :src="imageFormat(ad.img,600,800)" mode="widthFix" @load="onImageLoad"></image>
      </view>
      <view class="ia-quit" @tap.stop="hide">跳过</view>
    </view>
  </view>
</template>
<script>
import { deferPromise } from '@/utils/common.esm.js'
export default {
  props : ['ad'],
  data() {
    return {
      isshow : false,
      imgshow : false,
    }
  },
  created() {
    if(this.ad && this.ad.img){
      if(this.ad.img){
        this.image$ = deferPromise();
      }else{
        this.image$ = Promise.resolve();
      }
      this.show();
    }
  },
  methods: {
    onImageLoad(){
      this.image$.resolve();
    },
    show(){
      this.checkEnableTime().then(res => {
        this.isshow = true;
        this.$api.adView({
          ids : [this.ad.id]
        });
        this.image$.then(res => {
          this.imgshow = true;
        });
      })
    },
    checkEnableTime(){
      return Promise.resolve();
      let now = {
        time : +new Date(),
        ad : JSON.stringify(this.ad),
      }
      let last = uni.getStorageSync('ad_close');
      if(now.time - last.time > 12 * 60 * 60 * 1e3 || now.ad != last.ad){
        return Promise.resolve();
      }else{
        return Promise.reject();
      }
    },
    hide(){
      this.isshow = false;
      uni.setStorageSync('ad_close',{
        time : +new Date(),
        ad : JSON.stringify(this.ad),
      });
    },
    onDetail(){
      this.$api.adHit({
        id : this.ad.id
      });
      let { link_obj } = this.ad;
      this.$Router.customLink(link_obj);
      this.hide();
    }
  }
}
</script>
