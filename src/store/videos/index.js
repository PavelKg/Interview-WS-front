import Api from '@/api'

export default {
  state: {
    videos: [],
    activeVideoFile: '',
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
    LOAD_ACTIVE_VIDEO_FILE: ({dispatch}) => {
      if (localStorage.getItem('iws-app.activeVideoFile')) {
        try {
          const id = JSON.parse(localStorage.getItem('iws-app.activeVideoFile'))
          if (id !== {}) {
            dispatch('SET_ACTIVE_VIDEO', id)
          }
        } catch (e) {
          localStorage.removeItem('iws-app.activeVideoFile')
        }
      }
    },
    async GET_VIDEO_LIST({state, commit}, criterias) {
      commit('SET_VIDEO_LIST', [])
      const paramReqData = JSON.parse(JSON.stringify(state.reqData))

      if (criterias && Array.isArray(criterias)) {
        paramReqData.sDef.sFieldCriterias = [...criterias]
      }
      try {
        const result = await Api.videos(paramReqData)
        commit('SET_VIDEO_LIST', result.data.data)
      } catch (e) {
        // dispatch('ERROR', null, { root: true })
      }
    },
    SET_ACTIVE_VIDEO: ({commit, dispatch}, fileName) => {
      commit('SET_ACTIVE_VIDEO', fileName)
      dispatch('SAVE_VIDEOS_STATE')
    },
    SAVE_VIDEOS_STATE: ({state}) => {
      localStorage.setItem(
        'iws-app.activeVideoFile',
        JSON.stringify(state.activeVideoFile)
      )
    }
  },
  mutations: {
    SET_VIDEO_LIST: (state, videoList) => {
      console.log('SET_VIDEO_LIST=', videoList)
      state.videos = [...videoList]
    },
    SET_ACTIVE_VIDEO: (state, fileName) => {
      state.activeVideoFile = fileName
    }
  },
  getters: {
    videos: state => state.videos
  }
}
