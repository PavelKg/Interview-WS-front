export default {
  state: {
    mainWindowRect: {
      width: 0,
      height: 0
    }
  },
  actions: {},
  mutations: {
    windowsResize (state, rect) {
      state.mainWindowRect.width = rect.width
      state.mainWindowRect.height = rect.height
    }
  },
  getters: {
    windowsRect (state) {
      return state.mainWindowRect
    }
  }
}
