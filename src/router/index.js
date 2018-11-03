import Vue from 'vue'
import Router from 'vue-router'
import Home from './home'
import Applicant from '../hub/applicant'
import Management from '../hub/management'
import Login from './login'

Vue.use(Router)

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/')
// }

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Management',
      component: Management
    },
    {
      path: '/',
      name: 'Applicant',
      component: Applicant
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
      // beforeEnter: ifNotAuthenticated,
    }
  ]
})
