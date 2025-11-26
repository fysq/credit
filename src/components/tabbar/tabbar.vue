<template>
  <view class="tabbar" :class="{ 'is_iPhoneX' : is_iPhoneX }">
    <view class="tabbar-placeholder" :style="placeholderStyle"></view>
    <view class="tabbar-inner">
      <view class="tabbar-items">
        <block  v-for="(item,index) in pages" :key="index">
          <view class="tabbar-item" @tap="go" :data-item="item" :class="{ 'on' : nowPage(item.path) }">
            <view class="tabbar-icon" :class="item.icon"></view>
            <view class="tabbar-text">{{ item.name }}</view>
          </view>
          <view class="tabbar-item" v-if="index == 1" @tap="onSao">
            <view class="tabbar-sao"></view>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>
<script>
import Qs from '@/libs/qs.js'
export default {
  props : {
    placeholderStyle : {
      type : String,
      default : ``
    }
  },
  data() {
    return {
      is_iPhoneX : this.$store.getters.is_iPhoneX,
      pages : [{
        name : '首页',
        path : '/pages/index/index',
        icon  : 'i1'
      },{
        name : '商家',
        path : '/pages/shop/index',
        icon  : 'i2'
      },{
        name : '活动',
        path : '/pages/act/index',
        icon  : 'i3'
      },{
        name : '我的',
        path : '/pages/my/index',
        icon  : 'i4'
      }]
    }
  },
  computed : {
  },
  mounted() {
  },
  methods: {
    nowPage(path){
      return this.$Route.path.indexOf(path) > - 1;
    },
    go(e){
      const { item } = e.currentTarget.dataset;
      let { path } = item;
      this.$Router.pushTab({
        path : path
      })
    },
    sao(){
      return new Promise((resolve,reject) => {
        uni.scanCode({
          onlyFromCamera : true,
          success(res){
            resolve(res);
          },
          fail(res){
            reject(res);
          }
        })
      })
    },
    onSao(){
      this.sao().then(res => {
        console.log(res);
        let { path = '' } = res;
        path = '/' + path;
        //let path = '/pages/check/result?id=17&type=2&target_uid=07l8nKN1WQ';
        path = path.replace('/pages/check/result?scene=','');
        path = decodeURIComponent(path);
        let arr = path.split('_');
        let obj = {}
        obj.type = arr[0];
        obj.id = arr[1];
        obj.target_uid = arr[2];
        console.log(obj);
        this.$store.dispatch('getUid').then(uid => {
          let handler$;
          if(obj.type == 1){
            handler$ = this.$api.actCheck(obj);
          }else if(obj.type == 2){
            handler$ = this.$api.productCheck(obj);
          }
          if(handler$){
            handler$.then(res => {
              uni.showModal({
                title : `提示`,
                content : '核销成功'
              })
            })
          }
        })
      },err => {
      })
    }
  }
}
</script>
