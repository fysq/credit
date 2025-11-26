<template>
  <view class="myCreditEarn">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="mc-inner">
      <view class="mc-b1">
        <view class="mc-r1">
          <view class="mc-c1">当前积分</view>
          <view class="mc-c2" @tap="onRule">积分规则</view>
        </view>
        <view class="mc-r2">
          <view class="mc-num">{{ user.score }}</view>
          <view class="mc-btns">
            <view class="mc-btn" @tap="onExchange">去兑礼</view>
          </view>
        </view>
      </view>
      <view class="mc-b2 j-scroll-tab">
        <view class="mc-tabs" :style="tabScroll.topStyle" :class="{ 'tabFix' :tabScroll.tabFix }">
          <view class="mc-tab" v-for="(item,index) in tabs" :key="index" :class="{ 'on' : tabIndex == index }" @tap="onTab" :data-index="index">{{ item }}</view>
        </view>
        <view class="mc-t1" v-if="tabIndex == 0">
          <view class="mc-select" @tap="onSelect">
            <view class="mc-select-label">积分类型</view>
            <view class="mc-select-value" :class="{ 'unset' : !select.n1 }">{{ select.n1 }}</view>
          </view>
          <view class="mc-upload">
            <view class="mc-upload-hd">
              <view class="mc-upload-t1">上传附件<span class="mc-upload-num">{{ attachment.list.length }}/{{ attachment.max }}</span></view>
              <view class="mc-upload-t2">可以上传图片或word文档</view>
            </view>
            <view class="mc-upload-bd">
              <view class="mc-upload-item" v-for="(item,index) in attachment.list" :key="index">
                <view class="mc-upload-del" @tap="onDel" :data-index="index"></view>
                <image :src="imageFormat(item.url,195,195,0,1)" class="blockImg" v-if="item.type == 'img'"></image>
                <view class="mc-upload-file word" v-if="item.type == 'word'" @tap="onPreview" :data-item="item"></view>
              </view>
              <view class="mc-upload-item i1" @tap="onChoose" v-if="attachment.list.length < attachment.max">
                <text class="mc-upload-text">上传附件\n最多{{ attachment.max }}个</text>
              </view>
              <!--view class="mc-upload-item">
                <view class="mc-upload-del"></view>
                <image src="http://dummyimage.com/195x195" class="blockImg"></image>
              </view>
              <view class="mc-upload-item">
                <view class="mc-upload-del"></view>
                <image src="http://dummyimage.com/195x195" class="blockImg"></image>
              </view>
              <view class="mc-upload-item">
                <view class="mc-upload-del"></view>
                <image src="http://dummyimage.com/195x195" class="blockImg"></image>
              </view-->
            </view>
          </view>
          <view class="mc-ubtns">
            <view class="mc-ubtn b1" @tap="onCancel">取消申请</view>
            <view class="mc-ubtn b2" @tap="onSubmit">确定提交</view>
          </view>
        </view>
        <view class="mc-t2" v-if="tabIndex == 1">
          <view class="mc-submit mcSubmit" v-if="state.list.length > 0">
            <view class="ms-item" v-for="(item,index) in state.list" :key="item.id">
              <view class="ms-info">
                <view class="ms-n1">{{ item.name }}</view>
                <view class="ms-n2">{{ item.created }}</view>
                <view class="ms-n3"><span class="ms-n3-label">审核状态：</span><span class="ms-n3-value"><span class="ms-status" :class="['s' + item.verify_status]">{{ verify(item.verify_status) }}</span><span class="ms-reason" v-if="item.verify_reason && item.verify_status == 2">【未通过原因{{ item.verify_reason }}】</span></span></view>
              </view>
              <view class="ms-score" v-if="item.score_sended">+{{ item.score }}</view>
            </view>
            <!--view class="ms-item">
              <view class="ms-pic">
                <image src="http://dummyimage.com/130x110" class="blockImg"></image>
              </view>
              <view class="ms-info">
                <view class="ms-n1">消费积分</view>
                <view class="ms-n2">2024-03-22 15:10:13</view>
                <view class="ms-n3"><span class="ms-n3-label">审核状态：</span><span class="ms-n3-value"><span class="ms-status s2">待审核</span></span></view>
              </view>
              <view class="ms-score">+150</view>
            </view>
            <view class="ms-item">
              <view class="ms-pic">
                <image src="http://dummyimage.com/130x110" class="blockImg"></image>
              </view>
              <view class="ms-info">
                <view class="ms-n1">消费积分</view>
                <view class="ms-n2">2024-03-22 15:10:13</view>
                <view class="ms-n3"><span class="ms-n3-label">审核状态：</span><span class="ms-n3-value"><span class="ms-status s3">审核未通过</span></span></view>
              </view>
              <view class="ms-score">+50</view>
            </view>
            <view class="ms-item">
              <view class="ms-pic">
                <image src="http://dummyimage.com/130x110" class="blockImg"></image>
              </view>
              <view class="ms-info">
                <view class="ms-n1">消费积分</view>
                <view class="ms-n2">2024-03-22 15:10:13</view>
                <view class="ms-n3"><span class="ms-n3-label">审核状态：</span><span class="ms-n3-value"><span class="ms-status s3">审核未通过</span><span class="ms-reason">【未通过原因重复提交】</span></span></view>
              </view>
              <view class="ms-score">+50</view>
            </view>
            <view class="ms-item">
              <view class="ms-pic">
                <image src="http://dummyimage.com/130x110" class="blockImg"></image>
              </view>
              <view class="ms-info">
                <view class="ms-n1">消费积分</view>
                <view class="ms-n2">2024-03-22 15:10:13</view>
                <view class="ms-n3"><span class="ms-n3-label">审核状态：</span><span class="ms-n3-value"><span class="ms-status s3">审核未通过</span><span class="ms-reason">【未通过原因重复提交】</span></span></view>
              </view>
              <view class="ms-score">+50</view>
            </view-->
          </view>
          <empty v-if="state.list.length == 0 && state.islock"></empty>
        </view>
      </view>
    </view>
    <creditSelectDialog ref="c-creditSelectDialog" @select="onSelectCredit" v-model="select"></creditSelectDialog>
  </view>
</template>
<script>
import creditSelectDialog from '../components/creditSelectDialog.vue'
import Upload from '@/utils/Upload.class.js'
import tabScroll from '../mix/tabScroll.vue'
import commonList from '../mix/commonList.vue'
export default {
  mixins : [tabScroll,commonList],
  components : {
    creditSelectDialog
  },
  data() {
    return {
      title : `赚取积分`,
      tabs : ['赚取积分','提交记录'],
      tabIndex : 0,
      select : {},
      attachment : {
        list : [],
        max : 9,
      },
    }
  },
  computed : {
    user(){
      return this.$store.state.userInfo;
    }
  },
  onLoad() {
    this.up = Upload.getInstance();
  },
  methods: {
    onRule(){
      this.$Router.push({
        name : 'my.creditrule'
      })
    },
    onExchange(){
      this.$Router.push({
        name : 'credit'
      })
    },
    onChoose(){
      uni.showActionSheet({
        itemList : ['上传图片','上传word文档'],
        success : (res) => {
          let { tapIndex } = res;
          if(tapIndex == 0){
            this.chooseImage();
          }
          if(tapIndex == 1){
            this.chooseFile();
          }
        }
      })
    },
    verify(status){
      let arr = ['待审核','审核通过','审核未通过'];
      return arr[status];
    },
    chooseImage(){
      let { attachment } = this;
      let limit = attachment.max - attachment.list.length;
      this.up.chooseImage({
        limit : limit
      }).subscribe(res => {
        attachment.list.push({
          type : 'img',
          url : res.imageURL
        })
      })
    },
    chooseFile(){
      let { attachment } = this;
      let limit = attachment.max - attachment.list.length;
      this.up.chooseFile({
        limit : limit,
        extension : ['doc','docx'],
      }).subscribe(res => {
        attachment.list.push({
          type : 'word',
          url : res.imageURL
        })
      })
    },
    onDel(e){
      const { index } = e.currentTarget.dataset;
      this.attachment.list.splice(index,1);
    },
    onTab(e){
      this.tabIndex = e.currentTarget.dataset.index;
      this.scrollToTop();
      this.reset();
    },
    commonListApi(){
      return this.$api.scoreUploadLogLoad();
    },
    onSelect(){
      let c = this.$refs['c-creditSelectDialog'];
      c.show();
    },
    onCancel(){
      uni.navigateBack();
    },
    onPreview(){
    },
    resetUpload(){
      this.select = {};
      this.attachment.list = [];
    },
    checkSubmit(data){
      if(!data.type){
        uni.showToast({
          title : `请选择积分类型`,
          icon : 'none'
        })
        return Promise.reject();
      }
      if(data.attach_arr.length == 0){
        uni.showToast({
          title : `请上传附件`,
          icon : 'none'
        })
        return Promise.reject();
      }
      return Promise.resolve();
    },
    onSubmit(){
      let data = {
        type : this.select.type,
        attach_arr : this.attachment.list.map(res => {
          return {
            url : res.url,
            type : res.type
          }
        })
      }
      this.checkSubmit(data).then(res => {
        this.$api.scoreUpload(data).then(res => {
          uni.showToast({
            title : `提交成功`
          });
          setTimeout(() => {
            this.resetUpload();
          },2e3);
        })
      })
    }
  }
}
</script>
