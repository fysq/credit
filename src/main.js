import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import {router,RouterMount} from './router/router.js'  //路径换成自己的
Vue.use(router)
import store from './store/index.js'
import Api from './pages/class/Api.class.js'
import commonSearch from './pages/components/commonSearch.vue'
import commonTag from './pages/components/commonTag.vue'
import EventEmitter from './utils/EventEmitter.class.js'
import gmix from '@/utils/gmix.js'
import Tool from './utils/Tool.class.js'

Vue.mixin(gmix);
Vue.component('commonSearch',commonSearch);
Vue.component('commonTag',commonTag);

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$api = Api;
Vue.prototype.$ev = new EventEmitter();
Vue.prototype.$tool = Tool;

const app = new Vue({
  router,
  store,
  ...App
})
app.$mount()
