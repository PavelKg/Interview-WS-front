import Vue from 'vue'
import Vuex from 'vuex'
import i18nStore from './i18n'
import Login from './login'
import User from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: { i18nStore, Login, User }
})

export default store
