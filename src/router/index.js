import Vue from 'vue'
import Router from 'vue-router'

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

const Home = {template: '<h1>Home</h1>'}
const Interview = {template: '<h1>Interview</h1>'}
const Login = {template: '<h1>Login</h1>'}
// const ErrRoute = {template: '<h1>404</h1>'}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/interview',
      name: 'Interview',
      component: Interview
      // beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
      // beforeEnter: ifNotAuthenticated,
    }
  ]
})
