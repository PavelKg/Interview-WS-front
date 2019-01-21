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
    },
    async UPDATE_COMPANY ({ commit }, companyData) {
      try {
        const compId = companyData.id
        let compData = companyData
        delete compData.id
        const result = await Api.company_upd({compId, compData})
        if (result.data.code === 200) {
          compData.id = result.data
          commit('UPD_COMPANY', compData)
        } else {
          throw Error('Ошибка обновления данных')
        }
      } catch (e) {
        console.log('error')
        //dispatch('ERROR', null, { root: true })
      }
    },
    async ADD_COMPANY ({ commit }, companyData) {
      try {
        let compData = companyData
        delete compData.id
        const result = await Api.company_add({compData})
        compData.id = result.data.id
        commit('ADD_COMPANY', compDataq)
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
    },
    ADD_COMPANY: (state, companyData) => {
      state.companies = [...companyData]
    },
    UPD_COMPANY: (state, companyData) => {
      const ind = state.companies.findIndex(comp => {
        return comp.id === companyData.id
      })
      
      state.companies[ind] = companyData
    }
  },
  getters: {
    companies: state => state.companies,
    activeCompanyData (state) {
      const isSetActive = Boolean(state.activeCompanyId)
      if (isSetActive) {
        return state.companies.find(comp => {
          if ((comp.id === state.activeCompanyId)) {
            return true
          }
        })
      }
    },
    activeCompanyId: state => state.activeCompanyId
  }
}
