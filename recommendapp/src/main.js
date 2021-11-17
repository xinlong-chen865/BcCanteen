import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';

//api
import api from '@/assets/config/api.js'
//页面加载预处理
import NwdLoading from '@/components/nwd-loading/index'

Vue.config.productionTip = false

Vue.use(NwdLoading)

new Vue({
  router,
  store,
  render: h => h(App),
  data:{
	api:api
  }
}).$mount('#app')
