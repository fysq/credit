<template>
  <view class="creditSelectDialog" v-if="isshow">
    <view class="csd-inner animated fadeInUp">
      <view class="csd-hd">
        <view class="csd-btn b1" @tap="onCancel">取消</view>
        <view class="csd-btn b2" @tap="onOk">确定</view>
      </view>
      <view class="csd-bd">
        <view class="csd-item" v-for="(item,index) in list" :key="index" @tap="onSelect" :data-index="index">
          <view class="csd-i1">
            <view class="csd-title">{{ item.n1 }}</view>
            <view class="csd-content">{{ item.n2 }}</view>
          </view>
          <view class="csd-i2">
            <radio :checked="item.selected" name="r1" color="#00adb3"></radio>
          </view>
        </view>
        <!--view class="csd-item">
          <view class="csd-i1">
            <view class="csd-title">宣传积分</view>
            <view class="csd-content">宣传积分：每篇信息宣传稿获得30积分，鼓励会员积极参与宣传（提交凭证，后台审核）。</view>
          </view>
          <view class="csd-i2">
            <radio></radio>
          </view-->
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props : ['value'],
  data() {
    return {
      isshow : false,
      list : [{
        n1 : '消费积分',
        n2 : '根据消费金额获得相应积分，鼓励会员多消费（消费积分的标准和审核方式比如按次积分10分，提交采购凭证，后台审核）。',
        selected : false,
        type : 2,
      },{
        n1 : '宣传积分',
        n2 : '宣传积分：每篇信息宣传稿获得30积分，鼓励会员积极参与宣传（提交凭证，后台审核）。',
        selected : false,
        type : 1,
      }],
      select : {}
    }
  },
  mounted() {
  },
  methods: {
    onCancel(){
      this.hide();
    },
    onOk(){
      let item = this.list.find(res => res.selected);
      this.$emit('input',item);
      this.hide();
    },
    show(){
      this.select = Object.assign({},this.value);
      if(this.select.type){
        let item = this.list.find(res => res.type == this.select.type);
        item.selected = true;
      }
      this.isshow = true;
    },
    hide(){
      this.isshow = false;
      this.list.forEach(res => res.selected = false);
    },
    onSelect(e){
      let { index } = e.currentTarget.dataset;
      this.list.forEach(res => res.selected = false);
      this.list[index].selected = true;
    }
  }
}
</script>
