<template>
  <view class="myAct">
    <uni-nav-bar :fixed="true" status-bar :border="false" :title="title" :type="1" leftWidth="174rpx" rightWidth="174rpx"/>
    <view class="ma-list" v-if="state.list.length > 0">
      <view class="ma-item" v-for="(item,index) in state.list" :key="item.id">
        <view class="ma-hd">
          <view class="ma-time">报名时间 {{ item.created }}</view>
          <view class="ma-status" :class="['s' + item.verify_status]">{{ item.verify_name }}</view>
        </view>
        <view class="ma-bd" @tap="onAct" :data-item="item">
          <view class="ma-pic">
            <image :src="imageFormat(item.activity.cover,180,120)" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">{{ item.activity.title }}</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus" :class="['s' + item.activity.progress ]">{{ item.activity.progressName }}</span></view>
          </view>
          <view class="ma-qr" :class="{ 'vn' : item.verify_status != 0 }" @tap.stop="onCode" :data-item="item"></view>
        </view>
        <view class="ma-ft">
        <view class="ma-acttime">活动时间 {{ item.activity.start_time }} 至 {{ item.activity.end_time }}</view>
        </view>
      </view>
      <!--view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s2">已核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">粉雪小镇打卡活动</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s2">已结束</span></view>
          </view>
          <view class="ma-qr vn"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s1">未核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">全城寻找叶富贵新联会一卡通请你吃海鲜啦</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s3">未开始</span></view>
          </view>
          <view class="ma-qr vn"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s1">未核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">粉雪小镇打卡活动</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s1">进行中</span></view>
          </view>
          <view class="ma-qr" @tap="onCode"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s2">已核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">粉雪小镇打卡活动</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s2">已结束</span></view>
          </view>
          <view class="ma-qr vn"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s1">未核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">全城寻找叶富贵新联会一卡通请你吃海鲜啦</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s3">未开始</span></view>
          </view>
          <view class="ma-qr vn"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s1">未核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">粉雪小镇打卡活动</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s1">进行中</span></view>
          </view>
          <view class="ma-qr" @tap="onCode"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s2">已核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">粉雪小镇打卡活动</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s2">已结束</span></view>
          </view>
          <view class="ma-qr vn"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s1">未核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">全城寻找叶富贵新联会一卡通请你吃海鲜啦</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s3">未开始</span></view>
          </view>
          <view class="ma-qr vn"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s1">未核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">粉雪小镇打卡活动</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s1">进行中</span></view>
          </view>
          <view class="ma-qr" @tap="onCode"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s2">已核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">粉雪小镇打卡活动</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s2">已结束</span></view>
          </view>
          <view class="ma-qr vn"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view>
      <view class="ma-item">
        <view class="ma-hd">
          <view class="ma-time">报名时间 2024-03-22 11:20:41</view>
          <view class="ma-status s1">未核销</view>
        </view>
        <view class="ma-bd">
          <view class="ma-pic">
            <image src="http://dummyimage.com/180x120" class="blockImg"></image>
          </view>
          <view class="ma-info">
            <view class="ma-n1">全城寻找叶富贵新联会一卡通请你吃海鲜啦</view>
            <view class="ma-n2">活动状态：<span class="ma-actstatus s3">未开始</span></view>
          </view>
          <view class="ma-qr vn"></view>
        </view>
        <view class="ma-ft">
          <view class="ma-acttime">活动时间 2024-03-25 00:00 至 2024-05-07 23:59</view>
        </view>
      </view-->
    </view>
    <empty v-if="state.list.length == 0 && state.islock"></empty>
    <qrDialog ref="c-qrDialog"></qrDialog>
  </view>
</template>
<script>
import commonList from '../mix/commonList.vue'
import qrDialog from '../components/qrDialog.vue'
export default {
  mixins : [commonList],
  components : {
    qrDialog

  },
  data() {
    return {
      title : `我的活动`
    }
  },
  onLoad() {
    this.$store.dispatch('getUserInfo').then(res => {
      this.reset();
    })
  },
  methods: {
    commonListApi(){
      return this.$api.myActListLoad();
    },
    onAct(e){
      let { activity_id } = e.currentTarget.dataset.item;
      this.$Router.push({
        name : 'act.detail',
        params : {
          scene : activity_id
        }
      });
    },
    onCode(e){
      const { item } = e.currentTarget.dataset;
      this.$api.verifyCode({
        id : item.id,
        type : 1
      }).then(res => {
        let url = res.url;

        let c = this.$refs['c-qrDialog'];
        c.show({
          url,
          item : item.activity
        });
      })
    }
  }
}
</script>
