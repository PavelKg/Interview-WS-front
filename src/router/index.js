import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Hub from '../hub/'
import Login from './login'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  const isAuth = store.getters.authStatus === 'success'
  if (isAuth) {
    next(`/hub/${store.getters.user_role}`)
  } else {
    store.commit('SET_HEADER_AUTH')
    store.dispatch('GET_USER_INFO').then(() => {
      next(`/hub/${store.getters.user_role}`)
    }, () => {
      next(`/error`)
    })
  }
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    const isAuth = store.getters.authStatus === 'success'
    if (!isAuth) {
      store.commit('SET_HEADER_AUTH')
      store.dispatch('GET_USER_INFO').then(() => {
        next()
      })
    } else {
      next()
    }
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/login'
      // component: Home
    },
    {
      path: '/hub/:role',
      name: 'Role',
      component: Hub,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '*',
      redirect: '/login'
      //component: NotFound
    }
  ]
})
