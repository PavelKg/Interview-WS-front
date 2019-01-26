import Api from '@/api'

export default {
  state: {
    administrators: [],
    activeAdminId: ''
  },
  actions: {
    LOAD_ACTIVE_ADMIN_ID: ({dispatch}) => {
      if (localStorage.getItem('iws-app.activeAdminId')) {
        try {
          const id = JSON.parse(localStorage.getItem('iws-app.activeAdminId'))
          if (id !== {}) {
            dispatch('SET_ACTIVE_ADMIN', id)
          }
        } catch (e) {
          localStorage.removeItem('iws-app.activeAdminId')
        }
      }
    },
    SET_ACTIVE_ADMIN: ({commit, dispatch}, adminId) => {
      commit('SET_ACTIVE_ADMIN', adminId)
      dispatch('SAVE_ADMINISTRATORS_STATE')
    },
    SAVE_ADMINISTRATORS_STATE: ({state}) => {
      localStorage.setItem('iws-app.activeAdminId', JSON.stringify(state.activeCompanyId))
    },
    async GET_ADMINISTRATORS_LIST ({ commit }) {
      try {
        const result = await Api.administrators()
        commit('SET_ADMINISTRATORS_LIST', result.data.data)
      } catch (e) {
        // dispatch('ERROR', null, { root: true })
      }
    },
    async UPDATE_COMPANY ({ commit, dispatch }, companyData) {
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
    async ADD_COMPANY ({ commit, dispatch }, companyData) {
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
    async DEL_ADMINISTRATOR ({ commit, dispatch }, adminData) {
      try {
        // let compData = companyData
        const adminId = adminData.id
        const result = await Api.user_del({adminId})
        if (result.data.code === 200) {
          dispatch('GET_ADMINISTRATORS_LIST')
          return Promise.resolve('Success')
        } else {
          throw Error('Error del administrator')
        }
      } catch (e) {
        return Promise.reject(e)
      }
    }
  },
  mutations: {
    SET_ADMINISTRATORS_LIST: (state, adminList) => {
      state.administrators = [...adminList]
    },
    SET_ACTIVE_ADMIN: (state, adminId) => {
      state.activeAdminId = adminId
    }
  },
  getters: {
    administrators: state => state.administrators,
    activeAdminData (state) {
      const isSetActive = Boolean(state.activeAdminId)
      if (isSetActive) {
        return state.administrators.find(admin => {
          if ((admin.id === state.activeAdminId)) {
            return true
          }
        })
      }
    },
    activeAdminId: state => state.activeAdminId
  }
}
