import Vue from 'vue'
import Router from 'vue-router'
import Home from './home'
import Applicant from '../hub/applicant'
import Management from '../hub/management'
import Login from './login'
import NotFound from '../components/NotFound.vue'

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
      redirect: '/login'
      // component: Home
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
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})
