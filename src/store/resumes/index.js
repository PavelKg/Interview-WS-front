import Api from '@/api'

export default {
  state: {
    resumes: [],
    activeResume: {},
    reqData: {
      sDef: {
        sSortCriterias: [{sSort: 1}] /* {name: desc} */,
        sFieldCriterias: [] /* {"field":"event_today", "cond":"between", "val":[20190207,20190207 ]} */,
        sReqData: {
          sLimit: 0,
          sOffset: 0
        }
      }
    }
  },
  actions: {
    LOAD_ACTIVE_RUSEME: ({dispatch}) => {
      if (localStorage.getItem('iws-app.activeResumeId')) {
        try {
          const id = JSON.parse(localStorage.getItem('iws-app.activeResumeId'))
          if (id !== {}) {
            dispatch('SET_ACTIVE_RESUME', id)
          }
        } catch (e) {
          localStorage.removeItem('iws-app.activeResumeId')
        }
      }
    },
    async GET_RESUME_LIST({state, commit}, criterias) {
      commit('SET_RESUME_LIST', [])
      const paramReqData = JSON.parse(JSON.stringify(state.reqData))

      if (criterias && Array.isArray(criterias)) {
        paramReqData.sDef.sFieldCriterias = [...criterias]
      }
      try {
        const result = await Api.resumes(paramReqData)
        commit('SET_RESUME_LIST', result.data.data)
      } catch (e) {
        // dispatch('ERROR', null, { root: true })
      }
    },
    async GET_RESUME_BY_ID({state, commit}, resumeId) {
      const paramReqData = JSON.parse(JSON.stringify(state.reqData))
      if (resumeId) {
        paramReqData.sDef.sFieldCriterias = [{resume_id: resumeId}]
      }
      try {
        const result = await Api.resumes(paramReqData)
        return Promise.resolve(result.data.data[0])
      } catch (e) {
        // dispatch('ERROR', null, { root: true })
      }
    },
    async SET_ACTIVE_RESUME({commit, dispatch}, id) {
      const activeResumeItem = await dispatch('GET_RESUME_BY_ID', id)
      commit('SET_ACTIVE_RESUME', activeResumeItem)
      dispatch('SAVE_RESUMES_STATE')
    },
    SAVE_RESUMES_STATE: ({state}) => {
      localStorage.setItem(
        'iws-app.activeResumeId',
        JSON.stringify(state.activerRsume['id'])
      )
    }
  },
  mutations: {
    SET_RESUME_LIST: (state, resumeList) => {
      state.resumes = [...resumeList]
    },
    SET_ACTIVE_RESUME: (state, activItem) => {
      state.activeResume = {...activItem}
    }
  },
  getters: {
    resumes: state => state.resumes,
    activeResumeInfo: state => state.activeResume
  }
}
