import Api from '@/api'

export default {
  state: {
    token: localStorage.getItem('iws-token') || '',
    authStatus: ''
  },
  actions: {
    async LOGIN ({ commit }, formData) {
      commit('AUTH_REQUEST')
      const {personalId, companyId, password} = formData
      try {
        const resp = await Api.login({personalId, companyId, password})
        const { code } = resp.data
        if (code === 200) {
          localStorage.setItem('iws-token', resp.data.token)
          commit('AUTH_SUCCESS', resp.data.token)
          commit('SET_HEADER_AUTH')
        } else {
          throw Error('Authorization error')
        }
      } catch (err) {
        commit('AUTH_ERROR', err)
        localStorage.removeItem('iws-token') // if the request fails, remove any possible user token if possible
      }
    },
    async LOGOUT ({ commit }) {
      localStorage.removeItem('iws-token')
      Api.delHeaderAuth()
      commit('AUTH_LOGOUT', null)
    }
  },
  mutations: {
    AUTH_REQUEST: state => {
      state.authStatus = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
      state.token = token
      console.log(token)
      state.authStatus = 'success'
    },
    AUTH_ERROR: state => {
      state.authStatus = 'error'
    },
    AUTH_LOGOUT: state => {
      state.authStatus = ''
      state.token = ''
    },
    SET_HEADER_AUTH: state => {
      Api.setHeaderAuth(state.token)
    }
  },
  getters: {
    token: state => state.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.authStatus
  }
}
