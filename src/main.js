import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueAsyncComputed from 'vue-async-computed'

import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import '@mdi/font/css/materialdesignicons.css'

import './components/base'

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueResource)
Vue.use(VueAsyncComputed)

Vue.config.productionTip = false

Vue.use(VueMoment, {
  moment
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  VueMoment,
  render: h => h(App)
}).$mount('#app')
