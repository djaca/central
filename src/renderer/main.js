import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import '@/assets/styles.css'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

const swalPlugin = {}

swalPlugin.install = function (Vue) {
  Vue.prototype.$swal = Swal

  Vue.prototype.$toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000
  })
}

Vue.use(swalPlugin)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
