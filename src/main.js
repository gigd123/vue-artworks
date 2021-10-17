import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.prototype.$axios = axios

// withCredentials 會自動將 cookie 存在前端，每次發送 api 也會往後端送
axios.defaults.withCredentials = true

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
