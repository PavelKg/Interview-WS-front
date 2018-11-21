import Api from '@/api'

export default {
  state: {
    user: JSON.parse(localStorage.getItem('int-userinfo')) || ''
  },
  actions: {
    async GET_USER_INFO ({ commit }) {
      const result = await Api.user_info()
      localStorage.setItem('int-userinfo', JSON.stringify(result.data.user_info))
      commit('SET_USER', result.data.user_info)
    }
  },
  mutations: {
    SET_USER: (state, info) => {
      state.user = {...info}
    }
  },
  getters: {
    user: state => state.user,
    user_role: state => state.user.role_name
  }
}
