import Api from '@/api'

export default {
  state: {
    token: null
  },
  actions: {
    login ({ commit }, formData) {
      const {personalId, companyId, password} = formData
      console.log('LOGIN')
      Api.login({personalId, companyId, password}).then((response) => {
        localStorage.setItem('token', response.data.token)
        commit('SET_TOKEN', response.data.token)
      })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        localStorage.removeItem('token')
        commit('SET_TOKEN', null)
        resolve()
      })
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
      Api.setHeaderAuth(state.token)
    }
  },
  getters: {
    token: state => {
      return state.token
    }
  }
}
