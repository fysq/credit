// router.js
import {RouterMount,createRouter} from 'uni-simple-router';
import store from '../store/index.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES],
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
  if(to.name == 'my.apply'){
    store.dispatch('getUserInfo').then(res => {
      if(store.getters.isLogin){
        next();
      }else{
        next({
          name : 'my.login',
          params : {
            apply : 1
          }
        })
      }
    })
  }else{
    next();
  }
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

//自定义跳转
router.customLink = function(obj) {
  if(obj){
    //obj = {
      //page : '/pages/act/index'
    //};
    uni.navigateTo({
      url : obj
    })
    return;
    let item = ROUTES.find(res => {
      return res.path == obj.page
    })
    if(item){
      if(item.meta.tabbar == 1){
        router.pushTab({
          path : item.path
        })
      }else{
        router.push({
          path : item.path
        })
      }
    }
  }
}
export {
	router,
	RouterMount
}
