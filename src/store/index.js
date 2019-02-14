import Vue from 'vue'
import Vuex from 'vuex'
import i18nStore from './i18n'
import Login from './login'
import User from './user'
import Companies from './companies'
import Menu from './menu'
import Administrators from './administrators'
import Videos from './videos'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: { i18nStore, Login, User, Companies, Menu, Administrators, Videos }
})

export default store
