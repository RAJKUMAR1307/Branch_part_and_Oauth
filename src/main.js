import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuelidate from 'vuelidate'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(Vuelidate)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
