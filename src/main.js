// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {getStore} from './utils/utils'

Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    this.checkLogin()
  },
  watch: {
    '$route': 'checkLogin'
  },
  methods: {
    checkLogin () {
      if (!getStore('session')) {
        console.log('admin')
        this.$router.push('/login')
      } else {
        console.log('user')
        this.$router.push('/')
      }
    }
  }
})
