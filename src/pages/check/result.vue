<template>
<block v-if="isLoad">
  <view class="checkResult cr" v-if="status == 1">
    <view class="cr-inner">
      <view class="cr-b1">
        <view class="cr-pic"></view>
        <view class="cr-text">核销成功</view>
      </view>
      <!--view class="cr-b2">
        <view class="checkConfirm cc">
          <view class="cc-inner">
             <view class="cc-b3">
              <view class="cc-btn" @tap="onSao">继续扫码核销</view>
            </view>
          </view>
        </view>
      </view-->
    </view>
  </view>
  <view class="checkResultFail cr" v-if="status == 0">
    <view class="cr-inner">
      <view class="cr-b1">
        <view class="cr-pic"></view>
        <view class="cr-text">核销失败</view>
        <view class="cr-subtext">{{ msg }}</view>
      </view>
      <!--view class="cr-b2">
        <view class="cr-btn" @tap="onSao">继续扫码核销</view>
      </view-->
    </view>
  </view>
</block>
</template>
<script>
export default{
  data(){
    return {
      msg : '',
      isLoad : false,
      title : '',
      price : '',
      name : '',
      nick_name : '',
      phone : '',
      status : 1
    }
  },
  onLoad: function(options){
    let scene = decodeURIComponent(options.scene);
    let arr = scene.split('_');
    let obj = {};
    obj.type = arr[0];
    obj.id = arr[1];
    obj.target_uid = arr[2];
    this.$store.dispatch('getUid').then(uid => {
      let handler$;
      if(obj.type == 1){
        handler$ = this.$api.actCheck(obj);
      }else if(obj.type == 2){
        handler$ = this.$api.productCheck(obj);
      }
      handler$.then(res => {
        this.isLoad = true;
        /*
        uni.showModal({
          title : `提示`,
          content : '核销成功'
        })
        */
      })
    })
  },
  methods : {
  }
}

</script>
<style>
page{
  background:#f8f8f8!important;
}
</style>
