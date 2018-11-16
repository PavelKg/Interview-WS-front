import Vue from 'vue'
import Vuex from 'vuex'
import i18nStore from './i18n'
import login from './login'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: { i18nStore, login }
})

export default store
