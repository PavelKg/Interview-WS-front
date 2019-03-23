import Api from '@/api'

export default {
  state: {
    videos: [],
    reqData: {
      sDef: {
        sSortCriterias: [{sSort: 1}] /* {name: desc} */,
        sFieldCriterias: [] /* {"field":"event_today", "cond":"between", "val":[20190207,20190207 ]} */
      }
    }
  },
  actions: {
    async GET_VIDEO_LIST({state, commit}, criterias) {
      console.log('criterias=', Array.isArray(criterias))
      const paramReqData = JSON.parse(JSON.stringify(state.reqData))

      if (criterias && Array.isArray(criterias)) {
        paramReqData.sDef.sFieldCriterias = [...criterias]
      }
      try {
        const result = await Api.videos(paramReqData)
        console.log('videos=', result.data.data)
        commit('SET_VIDEO_LIST', result.data.data)
      } catch (e) {
        // dispatch('ERROR', null, { root: true })
      }
    }
  },
  mutations: {
    SET_VIDEO_LIST: (state, videoList) => {
      state.videos = [...videoList]
    }
  },
  getters: {
    videos: state => state.videos
  }
}
