import Api from '@/api'

export default {
  state: {
    companies: [],
    activeCompanyId: false
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
      state.companies = [...companyList]
    },
    SET_ACTIVE_COMPANY: (state, companyId) => {
      state.activeCompanyId = companyId
    }
  },
  getters: {
    companies: state => state.companies,
    activeCompanyId: state => state.activeCompanyId
  }
}
