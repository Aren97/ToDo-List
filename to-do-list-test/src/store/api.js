export default {
  state: {
    appUrl: window.location.href,
    serverUrl: 'https://arenmotivate.ru/back/',
    isDataLoading: false
  },

  getters: {
    serverUrl (state) {
      return state.serverUrl
    }
  }
}
