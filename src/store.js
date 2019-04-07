import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPage: 'home',
    shouldDisplayProject: false
  },
  mutations: {
    updateCurrentPage(state, newPage) {
      state.currentPage = newPage
    },
    updateDisplayProject(state, newState) {
      state.shouldDisplayProject = newState
    }
  },
  actions: {
    setCurrentPage(context, newPage) {
      context.commit('updateCurrentPage', newPage)
    },
    setDisplayProject(context, newState) {
      context.commit('updateDisplayProject', newState)
    }
  }
})
