import Api from '@/api'

export default {
  state: {
    videos: [],
    activeVideo: {},
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
    async GET_VIDEO_BY_ID({state, commit}, videoId) {
      const paramReqData = JSON.parse(JSON.stringify(state.reqData))
      if (videoId) {
        paramReqData.sDef.sFieldCriterias = [{video_id: videoId}]
      }
      try {
        const result = await Api.videos(paramReqData)
        return Promise.resolve(result.data.data[0])
      } catch (e) {
        // dispatch('ERROR', null, { root: true })
      }
    },
    async SET_ACTIVE_VIDEO({commit, dispatch}, id) {
      const activeVideoItem = await dispatch('GET_VIDEO_BY_ID', id)
      commit('SET_ACTIVE_VIDEO', activeVideoItem)
      dispatch('SAVE_VIDEOS_STATE')
    },
    SAVE_VIDEOS_STATE: ({state}) => {
      localStorage.setItem(
        'iws-app.activeVideoId',
        JSON.stringify(state.activeVideo['id'])
      )
    }
  },
  mutations: {
    SET_VIDEO_LIST: (state, videoList) => {
      state.videos = [...videoList]
    },
    SET_ACTIVE_VIDEO: (state, activItem) => {
      state.activeVideo = {...activItem}
    }
  },
  getters: {
    videos: state => state.videos,
    activeVideoInfo: state => state.activeVideo
  }
}
