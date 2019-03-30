// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import messages from './store/i18n/messages'
import dirClickOutside from './directive/click-outside'
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages: messages, // set locale messages
  silentTranslationWarn: true
})

Vue.use(Notifications)
Vue.use(BootstrapVue)

Vue.directive('click-outside', dirClickOutside)
require('es6-promise').polyfill()
Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
