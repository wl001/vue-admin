// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/eleuiRest.css'
Vue.use(ElementUI);
import store from './store'
import mock from './mock'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router' //路由数据
import './permission'
Vue.config.productionTip = false
import i18n from './lang'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
