import Api from '@/api'

export default {
  state: {
    videos: []
  },
  actions: {
    async GET_VIDEO_LIST({commit}) {
      try {
        const result = await Api.videos()
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
