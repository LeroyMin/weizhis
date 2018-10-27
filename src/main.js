// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueCookie from 'vue-cookie'
import httpRequest from '@/utils/httpUtils'
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

Vue.use(VueCookie)
Vue.use(iView)
Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法

// // api接口请求地址
// window.SITE_CONFIG['baseUrl'] = 'http://localhost:8081/cms';

// 保存整站vuex本地储存初始状态
// window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
