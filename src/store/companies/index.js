import Api from '@/api'

export default {
  state: {
    companies: []
  },
  actions: {
    async GET_COMPANY_LIST ({ commit, dispatch }) {
      try {
        const result = await Api.companies()
        commit('SET_COMPANY_LIST', result.data.data)
      } catch (e) {
        //dispatch('ERROR', null, { root: true })
      }
    }
  },
  mutations: {
    SET_COMPANY_LIST: (state, companyList) => {
      state.companies = state.companies.concat(companyList)
      console.log(state.companies)
    }
  },
  getters: {
    companies: state => state.companies
  }
}
