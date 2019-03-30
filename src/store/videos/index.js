import Api from '@/api'

export default {
  state: {
    videos: [],
    activeVideoId: '',
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
      if (localStorage.getItem('iws-app.activeVideoId')) {
        try {
          const id = JSON.parse(localStorage.getItem('iws-app.activeVideoId'))
          if (id !== {}) {
            dispatch('SET_ACTIVE_VIDEO', id)
          }
        } catch (e) {
          localStorage.removeItem('iws-app.activeVideoId')
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
    SET_ACTIVE_VIDEO: ({commit, dispatch}, id) => {
      commit('SET_ACTIVE_VIDEO', id)
      dispatch('SAVE_VIDEOS_STATE')
    },
    SAVE_VIDEOS_STATE: ({state}) => {
      localStorage.setItem(
        'iws-app.activeVideoFile',
        JSON.stringify(state.activeVideoId)
      )
    }
  },
  mutations: {
    SET_VIDEO_LIST: (state, videoList) => {
      console.log('SET_VIDEO_LIST=', videoList)
      state.videos = [...videoList]
    },
    SET_ACTIVE_VIDEO: (state, id) => {
      state.activeVideoId = id
    }
  },
  getters: {
    videos: state => state.videos,
    activeVideoId: state => state.activeVideoId
  }
}
