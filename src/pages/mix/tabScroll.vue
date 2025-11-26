<template></template>
<script>
export default {
  data() {
    return {
      tabScroll : {
        ptop : 0,
        key : '.j-scroll-tab',
        keyTop : 0,
        sbh : 0,
        topStyle : '',
        tabFix : false,
        tabFixOffsetTop : 22,
      }
    }
  },
  onPageScroll(e){
    this.tabScroll.ptop = e.scrollTop;
    if(e.scrollTop > this.tabScroll.keyTop){
      this.tabScroll.tabFix = true;
    }else{
      this.tabScroll.tabFix = false;
    }
  },
  created(){
    this.tabScroll.sbh = this.$store.getters.statusBarHeight;
    this.tabScroll.topStyle = `top:${ this.tabScroll.sbh }px`;
  },
  mounted(){
    //获取定位目标位置
    let query = uni.createSelectorQuery()
    query.select(this.tabScroll.key).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec((res) => {
      this.tabScroll.keyTop = res[0].top + res[1].scrollTop - this.tabScroll.sbh + this.tabScroll.tabFixOffsetTop;
      //console.log(this.tabScroll.keyTop);
    });
  },
  onLoad() {
  },
  methods: {
    scrollToTop(){
      let { ptop,sbh,key } = this.tabScroll;
      if(ptop > sbh){
        uni.pageScrollTo({
          selector : key,
          offsetTop : -sbh
        })
      }
    },
  }
}
</script>
