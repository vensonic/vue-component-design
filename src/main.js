import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Alert from '../src/components/alert/alert.js'
import Confirm from "../src/components/confirm/confirm.js";

Vue.config.productionTip = false
Vue.prototype.$Alert = Alert
Vue.prototype.$confirm = Confirm
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
