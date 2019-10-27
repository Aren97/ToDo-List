import Vue from 'vue'
import Vuex from 'vuex'
import Api from './api'
import Tasks from './tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Api,
    Tasks
  }
})
