<template></template>
<script>
export default {
  data() {
    return {
      state : {
        list : [],
        islock : false,
      },
      isLoad : false,
    }
  },
  onLoad() {
  },
  methods: {
    reset(clear = 0){
      if(clear){
        this.state = {
          list : [],
          islock : false,
        }
      }
      return this.refresh();
    },
    refresh(){
      return new Promise(resolve => {
        this.load$ = this.commonListApi();
        this.load$.subscribe(res => {
          this.state = res;
          this.isLoad = true;
          resolve();
        })
        this.load$.load();
      })
    }
  },
  destroyed(){
    if(this.load$){
      this.load$.destroy();
      this.load$ = null;
    }
  },
  onReachBottom(){
    if(this.load$)
      this.load$.load();
  }
}
</script>
