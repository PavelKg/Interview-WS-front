import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from './home'
import Applicant from '../hub/applicant/'
import Management from '../hub/management/'
import Super from '../hub/super/'
import Login from './login'
import NotFound from '../components/NotFound.vue'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  const isAuth = store.getters.authStatus === 'success'
  if (isAuth) {
    next(`/${store.getters.user_role}`)
  } else {
    store.commit('SET_HEADER_AUTH')
    store.dispatch('GET_USER_INFO').then(() => {
      next(`/${store.getters.user_role}`)
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
      path: '/management',
      name: 'Management',
      component: Management,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/super',
      name: 'Super',
      component: Super,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/applicant',
      name: 'Applicant',
      component: Applicant,
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
