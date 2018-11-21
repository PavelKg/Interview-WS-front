import Api from '@/api'

export default {
  state: {
    token: localStorage.getItem('int-token') || '',
    status: ''
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
    }
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.token = token
      console.log(token)
      state.status = 'success'
    },
    AUTH_ERROR: state => {
      state.status = 'error'
    },
    AUTH_LOGOUT: state => {
      state.status = ''
      state.token = ''
      state.user_role = ''
    }
  },
  getters: {
    token: state => state.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
}
