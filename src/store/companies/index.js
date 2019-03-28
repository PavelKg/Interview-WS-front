import Api from '@/api'

export default {
  state: {
    companies: [],
    activeCompanyId: ''
  },
  actions: {
    LOAD_ACTIVE_COMPANY_ID: ({commit}) => {
      if (localStorage.getItem('iws-app.activeCompanyId')) {
        try {
          const id = JSON.parse(localStorage.getItem('iws-app.activeCompanyId'))
          if (id !== {}) {
            commit('SET_ACTIVE_COMPANY', id)
          }
        } catch (e) {
          localStorage.removeItem('iws-app.activeCompanyId')
        }
      }
    },
    SAVE_COMPANY_STATE: ({state}) => {
      localStorage.setItem(
        'iws-app.activeCompanyId',
        JSON.stringify(state.activeCompanyId)
      )
    },
    async GET_COMPANY_LIST({commit}) {
      try {
        const result = await Api.companies()
        commit('SET_COMPANY_LIST', result.data.data)
      } catch (e) {
        // dispatch('ERROR', null, { root: true })
      }
    },
    async UPDATE_COMPANY({commit, dispatch}, companyData) {
      try {
        const compId = companyData.id
        let compData = companyData
        delete compData.id
        const result = await Api.company_upd({compId, compData})
        if (result.data.code === 200) {
          compData.id = result.data
          dispatch('GET_COMPANY_LIST')
          return Promise.resolve('Success')
        } else {
          throw Error('Error update company data')
        }
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async ADD_COMPANY({commit, dispatch}, companyData) {
      try {
        let compData = companyData
        delete compData.id
        const result = await Api.company_add({compData})
        console.log('result=', result)
        if (result.data.code === 200) {
          dispatch('GET_COMPANY_LIST')
          return Promise.resolve('Success')
        } else {
          throw Error('Error add company data')
        }
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async DEL_COMPANY({commit, dispatch}, companyData) {
      try {
        // let compData = companyData
        const compId = companyData.id
        const result = await Api.company_del({compId})
        console.log('result=', result)
        if (result.data.code === 200) {
          dispatch('GET_COMPANY_LIST')
          return Promise.resolve('Success')
        } else {
          throw Error('Error add company data')
        }
      } catch (e) {
        return Promise.reject(e)
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
    activeCompanyData(state, getters) {
      const isSetActive = Boolean(state.activeCompanyId)
      if (isSetActive) {
        return getters.companyById(state.activeCompanyId)
      } else {
        return {}
      }

    },
    companyById: state => companyId => {
      return state.companies.find(comp => {
        if (comp.id === companyId) {
          return true
        }
      })
    },
    activeCompanyId: state => state.activeCompanyId,
    actingCompanies(state) {
      const actComp = state.companies.filter(function(company) {
        return company.deleted_at == null
      })
      return actComp
    }
  }
}
