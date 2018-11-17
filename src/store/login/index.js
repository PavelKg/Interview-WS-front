import Api from '@/api'

export default {
  state: {
    token: localStorage.getItem('int-token') || '',
    status: '',
    user_role: ''
  },
  actions: {
    async LOGIN ({ commit }, formData) {
      commit('AUTH_REQUEST')
      const {personalId, companyId, password} = formData
      try {
        const resp = await Api.login({personalId, companyId, password})
        const { code } = resp.data
        if (code === 200) {
          localStorage.setItem('int-token', resp.data.token)
          Api.setHeaderAuth(resp.data.token)
          commit('AUTH_SUCCESS', resp.data.token)
        } else {
          throw Error('Authorization error')
        }
      } catch (err) {
        commit('AUTH_ERROR', err)
        localStorage.removeItem('int-token') // if the request fails, remove any possible user token if possible
      }
    },
    async LOGOUT ({ commit }) {
      localStorage.removeItem('int-token')
      Api.delHeaderAuth()
      commit('AUTH_LOGOUT', null)
    },
    async USER_ROLE ({ commit }) {
      const userRole = await Api.role()
      commit('USER_ROLE_SET', userRole)
    }
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.token = token
      state.status = 'success'
    },
    AUTH_ERROR: state => {
      state.status = 'error'
    },
    AUTH_LOGOUT: state => {
      state.status = ''
      state.token = ''
      state.user_role = ''
    },
    USER_ROLE_SET: (state, role) => {
      state.user_role = role
    }

  },
  getters: {
    token: state => state.token,
    user_role: state => state.user_role,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
}
